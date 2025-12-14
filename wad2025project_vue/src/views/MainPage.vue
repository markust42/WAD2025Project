<template>
  <main class="main-content">
    <section class="feed">

      <div class="feed-header">
        <h2>Recent Posts</h2>
        <button id="button" @click="logout">Logout</button>
      </div>

      <PostComponent
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @click="goToPost(post.id)"
      />

      <div class="feed-actions">
        <button id="button" @click="goToAddPost">Add post</button>
        <button id="button" @click="deleteAll">Delete all</button>
      </div>

    </section>
  </main>
</template>

<script>
import PostComponent from "../components/Post.vue";

export default {
  name: "MainPage",
  components: { PostComponent },

  data() {
    return {
      posts: []
    };
  },

  async mounted() {
    const res = await fetch("http://localhost:3000/api/posts");
    this.posts = await res.json();
  },

  methods: {
    goToPost(id) {
      this.$router.push(`/posts/${id}`);
    },
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
    goToAddPost() {
      this.$router.push("/addpost");
    },
    deleteAll() {
      alert("Delete all clicked");
    }
  }
};
</script>