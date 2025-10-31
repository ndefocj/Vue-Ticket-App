import { createRouter, createWebHistory } from "vue-router";
import Landing from "../pages/Landing.vue";
import PublicLayout from "../layouts/PublicLayout.vue";
import AppLayout from "../layouts/AppLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: PublicLayout,
      children: [
        { path: "", name: "landing", component: Landing },
        {
          path: "/auth",
          name: "auth",
          component: () => import("../pages/Auth.vue"),
        },
      ],
    },
    {
      path: "/",
      component: AppLayout,
      meta: { requiresAuth: true }, 
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("../pages/Dashboard.vue"),
        },
        {
          path: "/tickets",
          name: "tickets",
          component: () => import("../pages/Tickets.vue"),
        },
      ],
    },
    
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("../pages/NotFound.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const token = localStorage.getItem("ticketapp_session");

  if (requiresAuth && !token) {
   
    next({ name: "auth" });
  } else {
    next();
  }
});

export default router;