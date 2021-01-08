<template>
  <section class="flex w-full">
    <div class="m-auto">
      <div class="mt-10">
        <Create @new-user-added="addUser" />
        <table>
          <thead>
            <tr>
              <th class="border px-4 py-2">ID</th>
              <th class="border px-4 py-2">Avatar</th>
              <th class="border px-4 py-2">Name</th>
              <th class="border px-4 py-2">Email</th>
              <th class="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in state.users" :key="user.id">
              <td class="border px-4 py-2">{{ user._id }}</td>
              <td class="border px-4 py-2">
                <img
                  :src="user.avatar"
                  :alt="user.first_name + ' ' + user.last_name"
                  class="rounded-full"
                  width="50"
                />
              </td>
              <td class="border px-4 py-2">{{ user.name }}</td>
              <td class="border px-4 py-2">{{ user.email }}</td>
              <td class="border px-4 py-2">
                <button
                  class="px-2 py-1 bg-red-600 hover:bg-red-800 rounded text-white"
                  @click="deleteUser(user._id)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex justify-between mt-2">
          <button
            class="border px-3 py-2 rounded"
            @click="prev"
            :disabled="state.users.page === 1"
            :class="state.users.page === 1 ? 'bg-gray-100' : 'hover:shadow'"
          >
            Prev
          </button>
          <button
            class="border px-3 py-2 rounded"
            @click="next"
            :disabled="state.users.page === state.users.total_pages"
            :class="
              state.users.page === state.users.total_pages
                ? 'bg-gray-100'
                : 'hover:shadow'
            "
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted, reactive } from "vue";
import axios from "../plugins/axios";
import Create from "../components/UserCrud/Create";
export default {
  components: {
    Create,
  },
  setup() {
    const state = reactive({
      users: [],
    });

    onMounted(async () => {
      const { data } = await axios.get("/users");
      state.users = data;
    });

    async function next() {
      const { data } = await axios.get("/users?page=2");
      state.users = data;
    }

    async function prev() {
      const { data } = await axios.get("/users?page=1");
      state.users = data;
    }

    async function deleteUser(id) {
      await axios.delete(`/users/${id}`);
      state.users = state.users.filter((user) => user._id !== id);
    }

    function addUser(data) {
      state.users.push(data);
    }
    return { state, next, prev, deleteUser, addUser };
  },
};
</script>

<style>
</style>