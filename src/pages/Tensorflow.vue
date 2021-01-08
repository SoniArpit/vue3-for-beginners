<template>
  <section class="flex w-full">
    <div class="m-auto">
      <div class="mt-10">
        <h1 class="text-2xl my-4">Tensorflow Object Detection</h1>
        <div class="flex flex-wrap justify-center my-3">
          <div class="w-full flex justify-center">
            <button
              class="border rounded px-2"
              @click="openCamera"
              v-if="!isStreaming"
            >
              Open Camera
            </button>

            <div v-else class="flex justify-between">
              <button class="border rounded px-2" @click="stopStreaming">
                Stop Streaming
              </button>

              <button class="border rounded px-2" @click="snapshot">
                Snapshot
              </button>
            </div>
          </div>
          <video ref="videoRef" autoplay="true" width="100" />
        </div>

        <div class="flex flex-wrap justify-center">
          <img
            ref="imgRef"
            src="https://images.unsplash.com/photo-1533740566848-5f7d3e04e3d7"
            width="200"
            crossorigin="anonymous"
          />
          <div class="w-full">
            <div class="text-center my-3">
              <button @click="detect" class="border rounded px-2">
                <span v-if="isLoading">Loading...</span>
                <span v-else>Detect Object</span>
              </button>
            </div>

            <h3 class="text-xl text-center font-bold">Detected Objects</h3>

            <ul v-if="results.length > 0" class="list-disc">
              <li v-for="result in results" :key="result">
                {{ result.class }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
require("@tensorflow/tfjs-backend-cpu");
require("@tensorflow/tfjs-backend-webgl");
const cocoSsd = require("@tensorflow-models/coco-ssd");

export default {
  setup() {
    const imgRef = ref("");
    const videoRef = ref("");
    const results = ref([]);
    const isLoading = ref(false);
    const isStreaming = ref(false);

    async function detect() {
      const img = imgRef.value;
      isLoading.value = true;
      const model = await cocoSsd.load();

      // Classify the image.
      const predictions = await model.detect(img);

      results.value = predictions;
      isLoading.value = false;
    }

    async function openCamera() {
      if (navigator.mediaDevices.getUserMedia) {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cams = devices.filter((devices) => devices.kind === "videoinput");
        const camId = cams[0].deviceId;
        navigator.mediaDevices
          .getUserMedia({ video: { deviceId: { exact: camId } } })
          .then((stream) => {
            isStreaming.value = true;
            videoRef.value.srcObject = stream;
          });
      }
    }

    function stopStreaming() {
      const stream = videoRef.value.srcObject;
      const tracks = stream.getTracks();
      tracks.map((track) => track.stop());
      isStreaming.value = false;
    }

    function snapshot() {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoRef.value, 0, 0, 200, 200);
      const data = canvas.toDataURL("image/png");
      imgRef.value.setAttribute("src", data);
    }

    return {
      imgRef,
      results,
      detect,
      isLoading,
      openCamera,
      videoRef,
      isStreaming,
      stopStreaming,
      snapshot,
    };
  },
};
</script>

<style>
</style>