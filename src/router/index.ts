import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),

  // định nghĩa route
  routes: [
    {
      path: "/",
      redirect: "/users",
    },
    {
      path: "/users",
      name: "users",
      component: () => import("@/views/UserListView.vue"),
    },
    {
      // params id
      path: "/users/:id",
      name: "user-detail",
      component: () => import("@/views/UserDetailView.vue"),
    },
  ],
});

export default router;
