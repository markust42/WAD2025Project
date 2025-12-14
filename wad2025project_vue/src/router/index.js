import { createRouter, createWebHashHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";

import MainPage from "../views/MainPage.vue";
import LoginPage from "../views/LoginPage.vue";
import SignupPage from "../views/SignupPage.vue";
import ContactPage from "../views/ContactPage.vue";
import AddPostPage from "../views/AddPostPage.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "", component: MainPage },
      { path: "login", component: LoginPage },
      { path: "signup", component: SignupPage },
      { path: "contacts", component: ContactPage },
      { path: "addpost", component: AddPostPage }
    ]
  }
];

export default createRouter({
  history: createWebHashHistory(),
  routes
});