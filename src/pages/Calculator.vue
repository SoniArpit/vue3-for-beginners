<template>
  <section class="flex w-full">
    <div class="m-auto">
      <h1 class="text-2xl">Calculator</h1>
      <p
        class="text-3xl text-right mt-10 w-50 overflow-x-auto h-10"
        style="direction: rtl"
      >
        {{ currentNum }}
      </p>
      <div class="h-10">
        <small v-if="selectedOperation">
          {{ prevNum }}{{ selectedOperation }}{{ currentNum }}
        </small>
      </div>

      <div class="grid grid-cols-4 gap-1">
        <button @click="pressed('1')" class="rounded shadow border h-10 w-10">
          1
        </button>
        <button @click="pressed('2')" class="rounded shadow border h-10 w-10">
          2
        </button>
        <button @click="pressed('3')" class="rounded shadow border h-10 w-10">
          3
        </button>
        <button @click="pressed('+')" class="rounded shadow border h-10 w-10">
          +
        </button>
        <button @click="pressed('4')" class="rounded shadow border h-10 w-10">
          4
        </button>
        <button @click="pressed('5')" class="rounded shadow border h-10 w-10">
          5
        </button>
        <button @click="pressed('6')" class="rounded shadow border h-10 w-10">
          6
        </button>
        <button @click="pressed('-')" class="rounded shadow border h-10 w-10">
          -
        </button>
        <button @click="pressed('7')" class="rounded shadow border h-10 w-10">
          7
        </button>
        <button @click="pressed('8')" class="rounded shadow border h-10 w-10">
          8
        </button>
        <button @click="pressed('9')" class="rounded shadow border h-10 w-10">
          9
        </button>

        <button @click="pressed('*')" class="rounded shadow border h-10 w-10">
          *
        </button>
        <button @click="pressed('c')" class="rounded shadow border h-10 w-10">
          C
        </button>
        <button @click="pressed('0')" class="rounded shadow border h-10 w-10">
          0
        </button>
        <button @click="pressed('=')" class="rounded shadow border h-10 w-10">
          =
        </button>
        <button @click="pressed('/')" class="rounded shadow border h-10 w-10">
          /
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import useWindowEvent from "../utilities/composition/useWindowEvent";
export default {
  setup() {
    const operations = ["+", "-", "*", "/"];
    const currentNum = ref("");
    const prevNum = ref("");
    const selectedOperation = ref("");
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    function pressed(value) {
      if (value === "=" || value === "Enter") calculate();
      else if (value === "c") clear();
      else if (operations.includes(value)) applyOperation(value);
      else if (numbers.includes(value)) appendNumber(value);
    }

    function appendNumber(value) {
      currentNum.value = currentNum.value + value;
    }
    function applyOperation(value) {
      calculate();
      prevNum.value = currentNum.value;

      currentNum.value = "";
      selectedOperation.value = value;
    }

    function calculate() {
      if (selectedOperation.value === "*") mul();
      else if (selectedOperation.value === "/") div();
      else if (selectedOperation.value === "-") sub();
      else if (selectedOperation.value === "+") sum();

      prevNum.value = "";
      selectedOperation.value = "";
    }

    const mul = () => (currentNum.value = prevNum.value * currentNum.value);

    const div = () => (currentNum.value = prevNum.value / currentNum.value);

    const sub = () => (currentNum.value = prevNum.value - currentNum.value);

    const sum = () => (currentNum.value = +prevNum.value + +currentNum.value);

    const clear = () => (currentNum.value = "");

    const handleKeydonwn = (e) => pressed(e.key);
    useWindowEvent("keydown", handleKeydonwn);

    return { currentNum, pressed, selectedOperation, prevNum };
  },
};
</script>

<style>
</style>