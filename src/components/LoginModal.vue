<template>
  <div v-if="isLoginOpen">
    <section
      @click="closeLogin"
      class="z-20 h-screen w-screen bg-gray-500 fixed top-0 opacity-50"
    ></section>
    <div class="absolute inset-0">
      <div class="flex h-full">
        <div class="z-30 m-auto bg-white p-3 rounded shadow w-1/3">
          <div class="p-2 border">
            <h1 class="text-2xl text-center">Login</h1>

            <GoogleLogin @close-login-from-google="closeLogin" />

            <p class="mt-4 text-center">or</p>
            <form class="p-2 my-2" @submit.prevent="submit">
              <div class="my-4">
                <label for="">Email or Username</label>
                <input
                  type="text"
                  class="rounded shadow p-2 w-full"
                  placeholder="Enter your email or username"
                  v-model="form.email"
                  ref="emailRef"
                />
              </div>
              <div class="my-4">
                <label for="">Password</label>
                <input
                  type="Password"
                  class="rounded shadow p-2 w-full"
                  placeholder="Enter your password"
                  v-model="form.pass"
                />
              </div>
              <div class="my-4">
                <button
                  type="submit"
                  class="w-full rounded shadow bg-gradient-to-r from-green-800 to-green-600 text-white py-2"
                >
                  <span v-if="!isLoading">Login</span>
                  <span v-else>Loading...</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../utilities/firebase";
import GoogleLogin from "../components/Login/GoogleLogin";
export default {
  components: { GoogleLogin },
  computed: {
    isLoginOpen() {
      return this.$store.state.isLoginOpen;
    },
  },
  data() {
    return {
      form: {
        email: "soniarpit108@gmail.com",
        pass: "password",
        isLoading: false,
      },
    };
  },
  methods: {
    submit() {
      this.isLoading = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.pass)
        .then(() => {
          //   console.log(res);
          this.form.email = "";
          this.form.pass = "";
          this.isLoading = false;
          this.closeLogin();
        })
        .catch(() => {
          //   console.log(e);
          this.isLoading = false;
        });
    },
    closeLogin() {
      this.$store.commit("setLoginModal", false);
    },
  },
  mounted() {
    // this.$refs.emailRef.focus();
  },
};
</script>

<style>
</style>