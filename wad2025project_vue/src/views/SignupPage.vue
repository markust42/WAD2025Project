<template>
  <div class="container">
    <HeaderComponent />

    <div class="login-container">
      <div>
        <p>Create your PostIt account</p>

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

          <div v-if="errors.length" class="error-box">
            <p class="error-title">Password is not valid:</p>
            <ul>
              <li v-for="err in errors" :key="err">{{ err }}</li>
            </ul>
          </div>

          <button id="button">Sign up</button>
        </form>

        <a href="/">Already have an account? Log in</a>
      </div>
    </div>

    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from "../components/Header.vue";
import FooterComponent from "../components/Footer.vue";

export default {
  name: "SignupPage",
  components: { HeaderComponent, FooterComponent },

  data() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },

  methods: {
    validatePassword() {
      const p = this.password;
      this.errors = [];

      if (p.length < 8 || p.length > 14)
        this.errors.push("Length must be 8–14 characters");
      if (!/^[A-Z]/.test(p))
        this.errors.push("Must start with an uppercase letter");
      if (!/[A-Z]/.test(p))
        this.errors.push("Must include at least one uppercase letter");
      if ((p.match(/[a-z]/g) || []).length < 2)
        this.errors.push("Must include at least two lowercase letters");
      if (!/[0-9]/.test(p))
        this.errors.push("Must include at least one number");
      if (!/_/.test(p))
        this.errors.push("Must include the '_' character");

      return this.errors.length === 0;
    },

    submit() {
      if (this.validatePassword()) {
        alert("Signup successful!");
      }
    }
  }
};
</script>

<style scoped>
.error-box {
  width: 250px;
  background: #ffe6e6;
  border: 1px solid #cc0000;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
}
.error-title {
  font-weight: bold;
  color: #cc0000;
}
</style>