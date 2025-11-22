<template>
  <article class="post">

    <header class="post-header">
      <div class="post-author">
        <img :src="'/' + post.author.avatar" class="author-avatar" />
        <div class="author-info">
          <strong>{{ post.author.name }}</strong><br>
          <small>{{ post.author.email }}</small>
        </div>
      </div>

      <time :datetime="post.createdAt">
        {{ formattedDate }}
      </time>
    </header>

    <div class="post-content">
      <img v-if="post.image" :src="'/' + post.image" class="post-image" />

      <h3>{{ post.title }}</h3>
      <p>{{ post.body }}</p>
    </div>

    <div class="post-actions">
      <button @click="likePost">👍 Like ({{ post.likes }})</button>
    </div>

  </article>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "PostComponent",
  props: ["id"],

  computed: {
    ...mapState(["posts"]),
    post() {
      return this.posts.find(p => p.id === this.id);
    },
    formattedDate() {
      return new Date(this.post.createdAt).toLocaleDateString();
    }
  },

  methods: {
    likePost() {
      this.$store.commit("likePost", this.id);
    }
  }
};
</script>