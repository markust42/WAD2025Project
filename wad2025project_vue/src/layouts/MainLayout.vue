<template>
  <div class="container">
    <HeaderComponent />

    <main class="main-content">
      <router-view />
    </main>

    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from "../components/Header.vue";
import FooterComponent from "../components/Footer.vue";

export default {
  name: "MainLayout",
  components: {
    HeaderComponent,
    FooterComponent
  }
};
</script>