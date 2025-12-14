<template>
  <div class="login-container">
    <div>
      <h2>Login</h2>

      <form @submit.prevent="submit">
        <label>Email</label>
        <input
          type="email"
          v-model="email"
          placeholder="Email"
          required
        />

        <label>Password</label>
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          required
        />

        <div v-if="error" class="error-box">
          {{ error }}
        </div>

        <div class="action-buttons">
          <button id="button" type="submit">Login</button>
          <span>or</span>
          <button id="button" type="button" @click="goToSignup">Sign up</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",

  data() {
    return {
      email: "",
      password: "",
      error: ""
    };
  },

  methods: {
    submit() {
      // backend integration here later
      console.log("Login attempt:", this.email, this.password);

      // temp
      this.error = "Login not connected yet";
    },
    goToSignup() {
      this.$router.push("/signup");
    }
  }
};
</script>