<template>
  <article class="post" v-if="post">
    <header class="post-header">
      <strong class="post-date">{{ formattedDate }}</strong>
    </header>

    <div class="post-content">
      <p>{{ post.body }}</p>

      <img
        v-if="post.urllink"
        :src="post.urllink"
        class="post-image"
        alt="Post image"
      />
    </div>
  </article>
</template>

<script>
export default {
  name: "PostComponent",
  props: {
    post: {
      type: Object,
      required: true
    }
  },

  computed: {
    formattedDate() {
      const date = new Date(this.post.modified_at);

      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    }
  }
};
</script>