<template>
  <div class="add-post-container">
    <form class="add-post-form" @submit.prevent="updatePost">
      <h2>Edit Post</h2>

      <label>Body</label>
      <textarea
        class="edit-body"
        v-model="body"
        placeholder="body"
        required
      ></textarea>

      <div class="buttons-row">
        <button class="edit-buttons" type="submit">
          Update
        </button>

        <button
          class="edit-buttons"
          type="button"
          @click="deletePost"
        >
          Delete
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "EditPostPage",

  data() {
    return {
      body: "",
    };
  },

  async mounted() {
    const id = this.$route.params.id;

    try {
      const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: "GET",
        credentials: "include"
      });

      const post = await res.json();
      this.body = post.body;
    } catch (e) {
      console.log(e);
    }
  },

  methods: {
    async updatePost() {
      const id = this.$route.params.id;

      try {
        const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ body: this.body })
        });

        this.$router.push("/");
      } catch (e) {
        console.log(e);
      }
    },

    async deletePost() {
      const id = this.$route.params.id;
      if (!confirm("Delete this post?")) return;

      try {
        const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
          method: "DELETE",
          credentials: "include"
        });
        
        this.$router.push("/");
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
