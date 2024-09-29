// router.js
import { createRouter, createWebHistory } from 'vue-router';
import useAppwrite from '@/composables/useAppwrite.js';

// https://github.com/appwrite/demo-todo-with-vue/blob/main/src/router/index.js
//fare la landing
//
const routes = [
  {
    name: 'Login',
    path: '/login',
    component: () => import("@/views/guest/Login.vue")
  },
  {
    name: 'Register',
    path: '/register',
    component: () => import("@/views/guest/Register.vue")
  },
  {
    name: 'ForgotPassword',
    path: '/forgot-password',
    component: () => import("@/views/guest/ForgotPassword.vue")
  },
  {
    name: "Logout",
    path: "/logout",
    beforeEnter: async () => {
      const { account } = useAppwrite();
      await account.deleteSession('current');
      return { name: "Login" };
    },
  },
  {
    name: 'Home',
    path: '/',
    component: () => import("@/views/logged/Home.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'Me',
    path: '/me', component: () => import("@/views/logged/Me.vue"),
    meta: {
      requiresAuth: true
    }
  },
];

const { evaluateUser } = useAppwrite();
await evaluateUser();

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((from, to, next) => {
  const { user } = useAppwrite();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  console.log(from, to);
  console.log(user);
  console.log(requiresAuth);


  // console.log(from, to);
  // const { user } = useAppwrite();
  // //console.log('user is:', user.value);
  // console.log('user.value', user.value);
  // console.log('to.meta.requiresAuth', to.meta.requiresAuth);

  // const { toRoute } = routes.find(x => x.path)
  
  // if (
  //   !user.value &&
  //   to.meta.requiresAuth) {
  //   return { name: "Login" };
  // } else if (user.value && !to.meta.requiresAuth) {
  //   return false;
  // }
});

export default router;
