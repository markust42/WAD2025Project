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
    async submit() {
      try {
        const res = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        });

        const data = await res.json();
        if (res.ok) {
          this.$router.push("/");
        } else {
          alert("Login failed: " + (data.error || "Unknown error"));
        }
      } catch (err) {
        console.error(err);
        alert("Network error: " + err.message);
      }
    },
    goToSignup() {
      this.$router.push("/signup");
    }
  }
};
</script>