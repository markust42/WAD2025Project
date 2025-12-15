<template>
  <div class="add-post-container">
    <form class="add-post-form" @submit.prevent="submitPost">
      <h2>Add Post</h2>

      <input
        v-model="title"
        placeholder="Post title"
        required
      />

      <textarea
        v-model="body"
        placeholder="Post body"
        required
      ></textarea>

      <input
        v-model="urllink"
        placeholder="Image URL (optional)"
      />

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
      title: "",
      body: "",
      urllink: ""
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
          title: this.title,
          body: this.body,
          urllink: this.urllink
        })
      });

      this.$router.push("/");
    }
  }
};
</script>