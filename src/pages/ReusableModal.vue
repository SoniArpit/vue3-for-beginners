<template>
  <section class="flex w-full flex-wrap">
    <div class="m-auto">
      <h1 class="text-2xl my-5">Reusable Modal</h1>
      <Modal v-if="isRedModalOpen" @closeModal="isRedModalOpen = false">
        <template v-slot:title> Red Modal </template>
        <!-- we can use # instead of v-slot -->
        <template #body> Red Modal body </template>
      </Modal>
      <button @click="isRedModalOpen = true" class="border px-2">
        Red modal
      </button>

      <Modal v-if="isBlueModalOpen" @closeModal="isBlueModalOpen = false">
        <template #title> Blue Modal </template>
        <template #body> <p>Blue Modal body</p></template>
      </Modal>
      <button @click="isBlueModalOpen = true" class="border px-2">
        Blue modal
      </button>
    </div>
  </section>
</template> 

<script>
import Modal from "../components/Modal";
import { ref } from "vue";
export default {
  components: { Modal },
  setup() {
    const isRedModalOpen = ref(false);
    const isBlueModalOpen = ref(false);

    return { isRedModalOpen, isBlueModalOpen };
  },
};
</script>

<style>
</style>