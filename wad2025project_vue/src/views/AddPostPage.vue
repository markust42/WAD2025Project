<template>
  <div class="add-post-container">
    <form class="add-post-form" @submit.prevent="submitPost">
      <h2>Add Post</h2>

      <textarea
        v-model="body"
        placeholder="body"
        required
      ></textarea>

      <button class="submit-button">
        Create post
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddPostPage",

  data() {
    return {
      body: "",
    };
  },

  methods: {
    async submitPost() {

      await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          body: this.body,
        })
      });

      this.$router.push("/");
    }
  }
};
</script>