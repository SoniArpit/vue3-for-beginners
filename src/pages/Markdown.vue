<template>
  <div class="flex w-full flex-wrap">
    <h1 class="w-full text-center text-3xl m-3">Markdown App</h1>
    <section class="flex w-10/12 m-auto h-screen">
      <article class="w-1/2 border">
        <textarea
          class="w-full h-full"
          :value="text"
          @input="update"
          ref="markdownTextArea"
        ></textarea>
      </article>
      <article class="w-1/2 border bg-gray-100" v-html="markedText"></article>
    </section>
  </div>
</template>

<script>
import marked from "marked";
// import debounce from "../utilities/mixins/debounce";
import useDebounce from "../utilities/composition/useDebounce";
export default {
  // beforeCreate() {
  //   console.log("Before create");
  // },
  // created() {
  //   console.log("Created");
  // },
  // beforeMount() {
  //   console.log("Before mount");
  // },
  // mounted() {
  //   console.log("Mounted");
  // },
  // beforeUnmount() {
  //   console.log("Before unmount");
  // },
  // unmounted() {
  //   console.log("unmounted");
  // },

  // beforeUpdate() {
  //   console.log("before update");
  // },
  // updated() {
  //   console.log("updated");
  // },
  // mixins: [debounce],
  setup() {},
  data() {
    return {
      text: "",
      debounce: "",
    };
  },
  computed: {
    markedText() {
      return marked(this.text);
    },
  },
  methods: {
    update(e) {
      const task = () => (this.text = e.target.value);
      this.debounce(task, 500);
    },
  },
  mounted() {
    this.debounce = useDebounce();
    this.$refs.markdownTextArea.focus();
  },
};
</script>

<style>
</style>