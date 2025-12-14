<template>
  <header class="page-header" id="page-header">
    <nav class="main-nav">
      <router-link to="/">Home</router-link>
      <router-link to="/contacts">Contacts</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent"
};
</script>

<style scoped>
.page-header {
  justify-content: center !important;
}
</style>