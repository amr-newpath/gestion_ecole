import { createRouter, createWebHashHistory } from "vue-router";
// import Dashboard from "../views/Dashboard.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
// import DefaultLayout from "../components/DefaultLayout.vue";
import AdminDashboard from "../views/Admin/Dashboard.vue";
import EleveDashboard from "../views/Eleve//Dashboard.vue";
import ParentDashboard from "../views/Parent/Dashboard.vue";
import ProfDashboard from "../views/Prof/Dashboard.vue";
import AdministratifDashboard from "../views/Administratif/Dashboard.vue";
import ComptableDashboard from "../views/Comptable/Dashboard.vue";
import DirecteurDashboard from "../views/Directeur/Dashboard.vue";
import Unauthorized from "../views/Unauthorized.vue";
import NotFound from "../views/NotFound.vue";
import EleveProfile from "../views/Eleve/Profile.vue";
import ProfProfile from "../views/Prof/Profile.vue";
import ParentProfile from "../views/Parent/Profile.vue";
import AdminProfile from "../views/Admin/Profile.vue";

import store from "../store";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/DashboardLayout.vue"),
    meta: {
      requiresAuth: true,
      roles: ["Admin", "Administratif", "Comptable"],
    },
    children: [
      {
        path: "/",
        name: "Dashboard",
        component: () => import("@/views/Index.vue"),
      },
      {
        path: "/pages/blank",
        name: "Blank",
        component: () => import("@/views/pages/Blank.vue"),
      },
    ],
  },
  // {
  //   path: '/auth',
  //   name: 'Auth',
  //   component: () => import('@/layouts/AuthenticationLayout.vue'),
  //   children: [
  //     {
  //       path: '/auth/login',
  //       name: 'Login',
  //       component: () => import('@/views/auth/Login.vue'),
  //     },
  //     {
  //       path: '/auth/register',
  //       name: 'Register',
  //       component: () => import('@/views/auth/Register.vue'),
  //     },
  //     {
  //       path: '/auth/forgot-password',
  //       name: 'ForgotPassword',
  //       component: () => import('@/views/auth/ForgotPassword.vue'),
  //     },
  //     {
  //       path: '/auth/reset-password',
  //       name: 'ResetPassword',
  //       component: () => import('@/views/auth/ResetPassword.vue'),
  //     },
  //     {
  //       path: '/auth/confirm-password',
  //       name: 'ConfirmPassword',
  //       component: () => import('@/views/auth/ConfirmPassword.vue'),
  //     },
  //     {
  //       path: '/auth/verify-email',
  //       name: 'VerifyEmail',
  //       component: () => import('@/views/auth/VerifyEmail.vue'),
  //     },
  //   ],
  // },
  // {
  //   path: "/",
  //   redirect: "/dashboard",
  //   name: "Dashboard",
  //   component: DefaultLayout,
  //   meta: { requiresAuth: true, roles: ["Eleve"] },
  //   children: [{ path: "/dashboard", name: "Dashboard", component: Dashboard }],
  //   // // children: [],
  // },

  {
    path: "/login",
    name: "Login",
    component: Login,
    // meta: { isGuest: true },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    // meta: { isGuest: true },
  },
  {
    path: "/unauthorized",
    name: "Unauthorized",
    component: Unauthorized,
    // meta: { isGuest: true },
  },
  {
    path: "/not-found",
    name: "NotFound",
    component: NotFound,
    // meta: { isGuest: true },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/not-found",
  },
  {
    path: "/admin",
    // redirect: "/admin",
    // name: "AdminDashboard",
    // component: AdminDashboard,
    component: () => import("@/layouts/AdminDashboardLayout.vue"),
    meta: { requiresAuth: true, roles: ["Admin"] },
    children: [
      {
        path: "/admin",
        component: () => import("@/views/Index.vue"),
        name: "AdminDashboard",
      },
      {
        path: "profile",
        component: () => import("@/views/Admin/Profile.vue"),
        name: "AdminProfile",
      },
      {
        path: "gadmins",
        component: () => import("@/views/Admin/GSAdmins/Home.vue"),
        name: "HomeAdmins",
      },
      {
        path: "create-compte",
        component: () => import("@/views/Admin/GSAdmins/AccountAdmins.vue"),
        name: "AccountAdmins",
      },
      {
        path: "edit-user/:id",
        name: "EditUser",
        component: () => import("@/views/Admin/GSAdmins/EditUser.vue"),
      },
      {
        path: "eleves",
        component: () => import("@/views/Admin/GSEleves/ListEleves.vue"),
        name: "ListElevesAdmin",
      },
      {
        path: "tuteurs",
        component: () => import("@/views/Admin/GSTuteurs/ListTuteurs.vue"),
        name: "ListTuteursAdmin",
      },
      {
        path: "profs",
        component: () => import("@/views/Admin/GSProfs/Home.vue"),
        name: "HomeProfs",
      },
      {
        path: "create-prof",
        component: () => import("@/views/Admin/GSProfs/AccountProfs.vue"),
        name: "AccountProfs",
      },
      {
        path: "edit-user/:id",
        name: "EditProf",
        component: () => import("@/views/Admin/GSProfs/EditProf.vue"),
      },
      {
        path: "matieres",
        name: "ListMatieres",
        component: () => import("@/views/Admin/Matieres/ListMatieres.vue"),
      },
    ],
  },
  {
    path: "/administratif",
    // component: AdministratifDashboard,
    component: () => import("@/layouts/AdministratifDashboardLayout.vue"),
    meta: { requiresAuth: true, roles: ["Administratif"] },
    children: [
      {
        path: "/administratif",
        component: () => import("@/views/Index.vue"),
        name: "AdministratifDashboard",
      },
      {
        path: "profile",
        component: () => import("@/views/Administratif/Profile.vue"),
        name: "AdministratifProfile",
      },
      {
        path: "inscriptions/",
        component: () => import("@/views/Administratif/Inscriptions/Home.vue"),
        name: "HomeInscription",
      },
      {
        path: "inscriptions/creer-eleve",
        component: () =>
          import("@/views/Administratif/Inscriptions/CreateInscription.vue"),
        name: "EleveInscription",
      },
      {
        path: "eleves/",
        component: () => import("@/views/Administratif/Eleves/ListEleves.vue"),
        name: "ListEleves",
      },
      {
        path: "tuteurs/",
        component: () =>
          import("@/views/Administratif/Tuteurs/ListTuteurs.vue"),
        name: "ListTuteurs",
      },
      {
        path: "services/",
        component: () =>
          import("@/views/Administratif/Services/ListServices.vue"),
        name: "ListServices",
      },
      {
        path: "classes/",
        component: () =>
          import("@/views/Administratif/Classes/TableClasses.vue"),
        name: "ListClasses",
      },
      {
        path: "plannings/",
        component: () =>
          import("@/views/Administratif/Plannings/CreatePlanning.vue"),
        name: "CreatePlanning",
      },
    ],
  },
  {
    path: "/comptable",
    component: () => import("@/layouts/ComptableDashboardLayout.vue"),
    // name: "ComptableDashboard",
    meta: { requiresAuth: true, roles: ["Comptable"] },
    children: [
      {
        path: "/comptable",
        component: () => import("@/views/Index.vue"),
        name: "ComptableDashboard",
      },
      {
        path: "profile",
        component: () => import("@/views/Comptable/Profile.vue"),
        name: "ComptableProfile",
      },
      {
        path: "paiements/",
        component: () => import("@/views/Comptable/Paiements/Home.vue"),
        name: "HomePaiement",
      },
      {
        path: "paiements/create",
        component: () =>
          import("@/views/Comptable/Paiements/CreatePaiement.vue"),
        name: "CreatePaiement",
      },
      {
        path: "paiements/menusalite",
        component: () =>
          import("@/views/Comptable/Paiements/ConsultationMensualite.vue"),
        name: "MensualitePaiement",
      },
      {
        path: "paiements/rubrique",
        component: () =>
          import("@/views/Comptable/Paiements/ConsultationRubrique.vue"),
        name: "RubriquePaiement",
      },
      {
        path: "paiements/cheque",
        component: () =>
          import("@/views/Comptable/Paiements/ChequePaiement.vue"),
        name: "ChequePaiement",
      },
      {
        path: "paiements/rapport",
        component: () =>
          import("@/views/Comptable/Paiements/RapportPaiement.vue"),
        name: "RapportPaiement",
      },
    ],
  },
  {
    path: "/directeur",
    component: DirecteurDashboard,
    meta: { requiresAuth: true, roles: ["Directeur"] },
    children: [
      {
        path: "",
        // component: DirectorReports,
      },
    ],
  },

  {
    path: "/prof",
    component: () => import("@/layouts/DashboardLayout.vue"),
    // name: "ProfDashboard",
    meta: { requiresAuth: true, roles: ["Prof"] },
    children: [
      {
        path: "plannings",
        component: () =>
          import("@/views/Prof/Plannings.vue"),
        name: "ProfPlanning",
      },
      {
        path: "profile",
        component: ProfProfile,
        name: "ProfProfile",
      },

    ],
  },

  {
    path: "/eleve",
    component: () => import("@/layouts/DashboardLayout.vue"),
    // name: "EleveDashboard",
    meta: { requiresAuth: true, roles: ["Eleve"] },
    children: [
      // {
      //   path: '',
      //   // component: EleveCourses,
      // },
      {
        path: "planning",
        component: () =>
          import("@/views/Eleve/Planning.vue"),
        name: "ElevePlanning",
      },
      {
        path: "/eleve",
        component: EleveProfile,
        name: "EleveProfile",
      },
    ],
  },
  {
    path: "/parent",
    component: ParentDashboard,
    name: "FamilleDashboard",
    meta: { requiresAuth: true, roles: ["Famille"] },
    children: [
      // {
      //   path: '',
      //   // component: ParentChildren,
      // },
      {
        path: "profile",
        component: ParentProfile,
      },
    ],
  },
  
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  // const userRole = store.getters["userRole"];

  console.log(sessionStorage.getItem("userRole"));

  if (to.name === "Login" && store.state.user.token) {
    next({ name: `${sessionStorage.getItem("userRole")}Dashboard` });
    return;
  }

  if (requiresAuth) {
    if (!store.state.user.token) {
      next({ name: "Login" });
    } else if (to.meta.roles.includes(sessionStorage.getItem("userRole"))) {
      next();
    } else {
      next("/unauthorized");
    }
  } else {
    next();
  }

  if (!to.matched.length) {
    next("/not-found");
  }

  // const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  // const userRole = store.getters['userRole'];

  // if (requiresAuth) {
  //   if (!store.state.user.token) {
  //     next({ name: "Login" });
  //   } else if (to.meta.roles.includes(userRole)) {
  //     next();
  //   } else {
  //     next('/unauthorized');
  //   }
  // } else {
  //   next();
  // }
  // if (to.meta.requiresAuth && !store.state.user.token) {
  //   next({ name: "Login" });
  // } else if (
  //   store.state.user.token &&
  //   to.meta.isGuest
  // ) {
  //   next({ name: "Dashboard" });
  // } else {
  //   next();
  // }
});

export default router;
