<template>
  <article class="post" v-if="post">
    <header class="post-header">
      <strong>{{ post.title }}</strong>
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
  }
};
</script>