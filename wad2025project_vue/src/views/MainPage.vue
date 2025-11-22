<template>
  <div class="container">
    <HeaderComponent />

    <main class="main-content">
      <div class="sidebar-left">
        <h2>Sidebar Left</h2>
        <p>This is a sidebar-left</p>
      </div>

      <section class="feed">
        <h2>Recent Posts</h2>

        <button @click="resetLikes" id="button">
          Reset All Likes
        </button>

        <PostComponent
          v-for="post in posts"
          :key="post.id"
          :id="post.id"
        />
      </section>

      <div class="sidebar-right">
        <h2>Sidebar Right</h2>
        <p>This is a sidebar-right</p>
      </div>
    </main>

    <FooterComponent />
  </div>
</template>

<script>
import { mapState } from "vuex";
import HeaderComponent from "../components/Header.vue";
import FooterComponent from "../components/Footer.vue";
import PostComponent from "../components/Post.vue";

export default {
  name: "MainPage",
  components: { HeaderComponent, FooterComponent, PostComponent },
  computed: mapState(["posts"]),

  methods: {
    resetLikes() {
      this.$store.commit("resetLikes");
    }
  }
};
</script>