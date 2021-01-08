<template>
  <div class="flex w-full flex-wrap relative">
    <div v-for="(color, index) in slider" :key="color" class="absolute w-full">
      <transition name="fade">
        <div
          v-if="currentSlide == index"
          :class="color"
          style="height: 350px"
        ></div>
      </transition>
    </div>
    <div class="w-full" style="height: 340px">
      <div class="absolute bottom-0 w-full flex justify-center">
        <div
          v-for="(item, index) in slider"
          :key="item"
          @click="makeActive(index)"
          class="w-4 mx-1 h-4 rounded-full cursor-pointer shadow-md"
          :class="currentSlide == index ? 'bg-gray-700' : 'bg-gray-300'"
        ></div>
      </div>
    </div>

    <!-- <div class="m-auto my-10">
      <transition name="fade">
        <h1 v-if="isTitleShowing">Slider Carousel</h1>
      </transition>
      <button
        class="px-2 rounded border"
        @click="isTitleShowing = !isTitleShowing"
      >
        Toggle Text
      </button>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentSlide: 0,
      interval: "",
      slider: ["bg-blue-600", "bg-green-600", "bg-yellow-600", "bg-red-600"],
      isTitleShowing: true,
    };
  },
  methods: {
    makeActive(index) {
      this.currentSlide = index;
    },
  },
  mounted() {
    this.interval = setInterval(() => {
      console.log("I am changing current slide", this.currentSlide);
      this.currentSlide = this.currentSlide == 3 ? 0 : this.currentSlide + 1;
    }, 2000);
  },
  beforeUnmount() {
    console.log("I am unmounting slider before you moving to the another page");
    clearInterval(this.interval);
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 1s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>