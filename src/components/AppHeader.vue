<template>
  <nav
    class="w-full bg-gradient-to-r from-blue-800 to-blue-600 px-4 py-2 text-white"
  >
    <router-link
      v-for="item in list"
      :key="item.to"
      :to="item.to"
      class="mx-2"
      >{{ item.title }}</router-link
    >
    <button v-if="isLoggedIn" class="mx-2 border rounded px-2" @click="logout">
      Logout
    </button>
    <button v-else class="mx-2 border rounded px-2" @click="openLogin">
      Login
    </button>
  </nav>
</template>

<script>
import firebase from "../utilities/firebase";
export default {
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
  },
  // props: { isLoggedIn: { type: Boolean } },
  data() {
    return {
      list: [
        { title: "Marvel Heroes", to: "/marvel-heroes" },
        { title: "Calendar", to: "/calendar" },
        { title: "Markdown", to: "/markdown" },
        { title: "Slider", to: "/slider" },
        { title: "Calculator", to: "/calculator" },
        { title: "Reusable Modal", to: "/reusable-modal" },
        { title: "Chats", to: "/chats" },
        { title: "User Crud", to: "/usercrud" },
        { title: "Tensorflow", to: "/tensorflow" },
      ],
    };
  },
  methods: {
    openLogin() {
      this.$store.commit("setLoginModal", true);
    },
    logout() {
      firebase.auth().signOut();
      // .then((res) => {

      // })
      // .catch((e) => {});
    },
  },
};
</script>

<style>
</style>