import { createStore } from "vuex";
import postsRaw from "../data/posts.json";

export default createStore({
  state: {
    posts: postsRaw.map(p => ({ ...p, likes: p.likes ?? 0 }))
  },

  mutations: {
    likePost(state, id) {
      const post = state.posts.find(p => p.id === id);
      if (post) post.likes++;
    },
    resetLikes(state) {
      state.posts.forEach(p => (p.likes = 0));
    }
  }
});