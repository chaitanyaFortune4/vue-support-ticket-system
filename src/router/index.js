import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import NotFound from "@/views/NotFound.vue";
import SupportTicketList from "@/components/SupportTicketList.vue";
import SupportTicketForm from "@/components/SupportTicketForm.vue";
import SupportTicketDetails from "@/components/SupportTicketDetails.vue";
import UploadAssetsForm from "@/components/UploadAssetsForm.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "ticket-list",
      component: SupportTicketList,
    },
    {
      path: "/create-ticket",
      name: "create-ticket",
      component: SupportTicketForm,
    },
    {
      path: "/ticket-details/:id",
      name: "ticket-details",
      component: SupportTicketDetails,
    },
    {
      path: "/upload-assets",
      name: "upload-assets",
      component: UploadAssetsForm,
    },

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
    {
      path: "/:pathmatch(.*)*",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

export default router;
