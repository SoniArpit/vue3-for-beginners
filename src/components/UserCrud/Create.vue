<template>
  <button class="px-2 py-1 border rounded my-3" @click="isModalOpen = true">
    Add User
  </button>
  <teleport to="body">
    <Modal v-if="isModalOpen" @closeModal="isModalOpen = false">
      <template #title> Add new user </template>

      <template #body>
        <form @submit.prevent="submit">
          <div class="p-2">
            <input
              class="border w-full p-2 rounded"
              placeholder="User Name"
              v-model="state.form.name"
            />
          </div>
          <div class="p-2">
            <input
              class="border w-full p-2 rounded"
              type="email"
              placeholder="User Email"
              v-model="state.form.email"
            />
          </div>
          <div class="p-2">
            <input
              class="border w-full p-2 rounded"
              type="text"
              placeholder="Avatar URL"
              v-model="state.form.avatar"
            />
          </div>

          <div class="p-2">
            <button
              type="submit"
              class="w-full border p-2 rounded hover:bg-gray-100"
            >
              Create
            </button>
          </div>
        </form>
      </template>
    </Modal>
  </teleport>
</template>

<script>
import Modal from "../Modal";
import { reactive, ref } from "vue";
import axios from "../../plugins/axios";
export default {
  components: { Modal },
  setup(_, { emit }) {
    const isModalOpen = ref(false);
    const state = reactive({
      form: {
        name: "",
        email: "",
        avatar: "",
      },
    });

    async function submit() {
      const { data } = await axios.post("/users", state.form);
      //   console.log(data);
      emit("new-user-added", data);
      state.form.name = "";
      state.form.email = "";
      state.form.avatar = "";
      isModalOpen.value = false;
    }

    return { state, isModalOpen, submit };
  },
};
</script>

<style>
</style>