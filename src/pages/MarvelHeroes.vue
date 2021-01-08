<template>
  <!-- <h1>{{ title.toUpperCase() }}</h1> -->
  <!-- v-html  is dengerous because its enable xss (cross site scripting) -->
  <!-- <div v-if="isShowing" v-html="title"></div>
  <h3 v-else-if="isShowing === null">this is v-else-if</h3>
  <h2 v-else>this is v-else</h2> -->

  <!-- <div v-show="isShowing">{{ count }}</div> -->
  <!-- <div v-text="count"></div> -->

  <!-- <div v-once>{{ count }}</div> -->

  <!-- <p>Something</p> -->
  <div class="m-auto">
    <h1 class="text-5xl">Marvel Heroes {{ heroesCount }}</h1>

    <!-- <h2>{{ fullName }}</h2>
    <h2>{{ fName }} {{ lName }}</h2>
    <p>{{ randC }}</p>
    <p>{{ randC }}</p>
    <p>{{ randC }}</p>
    <p>{{ randM() }}</p>
    <p>{{ randM() }}</p>
    <p>{{ randM() }}</p> -->

    <ul>
      <li v-for="(hero, index) in marvelHeroes" v-bind:key="hero.name">
        <p>{{ hero.name }} <button @click="removeHero(index)">X</button></p>
        <input type="text" />
      </li>
    </ul>
    <!-- <input :[attribute]="newHero" />
  <button :disabled="isDisabled">Add Hero</button> -->
    <!-- <input v-model.number="newHero" />
  <p>{{ newHero }}</p>
  <button @click="newHero = 'Bruce'">Add Hero</button> -->
    <form @submit.prevent="addHero">
      <input
        class="border rounded px-2"
        v-model.number="newHero"
        placeholder="Type hero name..."
        ref="newHeroRef"
      />
      <button type="submit" class="bg-gray-900 px-2 text-white ml-1 rounded">
        Submit
      </button>
    </form>

    <!-- <button
      @click="setFullName"
      class="bg-gray-900 px-2 text-white ml-1 rounded"
    >
      Set full name
    </button> -->
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
export default {
  setup() {
    const newHeroRef = ref("");
    const newHero = ref("");
    const marvelHeroes = ref([
      { name: "Spiderman" },
      { name: "Ironman" },
      { name: "Black widow" },
      { name: "Captain america" },
    ]);

    onMounted(() => {
      newHeroRef.value.focus();
    });

    const heroesCount = computed({
      get: () => marvelHeroes.value.length,
    });

    function addHero() {
      // alert("hey");
      if (newHero.value !== "") {
        marvelHeroes.value.unshift({ name: newHero.value });
        newHero.value = "";
      }
    }

    function removeHero(index) {
      // this.marvelHeroes.pop(index);
      marvelHeroes.value = marvelHeroes.value.filter((hero, i) => i != index);
    }

    // return { marvelHeroes: marvelHeroes };
    return {
      marvelHeroes,
      newHero,
      removeHero,
      addHero,
      newHeroRef,
      heroesCount,
    };
  },

  // data() {
  //   return {
  //     title: "<h1>Hey Vue3</h1>",
  //     isDisabled: false,
  //     count: 0,

  //     isActive: false,
  //     attribute: "value",

  //     fName: "Peter",
  //     lName: "Parker",
  //   };
  // },

  // methods: {
  //   randM() {
  //     return Math.random();
  //   },

  //   setFullName() {
  //     this.fullName = "Code Snail";
  //   },
  // },

  // computed: {
  //   randC() {
  //     return Math.random();
  //   },
  //   fullName: {
  //     get() {
  //       return `${this.fName} ${this.lName}`;
  //     },
  //     set(fullName) {
  //       const values = fullName.split(" ");
  //       this.fName = values[0];
  //       this.lName = values[1];
  //     },
  //   },
  // },

  // mounted() {
  //   setInterval(() => {
  //     this.count++;
  //   }, 1000);
  // },
};
</script>

<style>
</style>