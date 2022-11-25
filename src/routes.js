import VueRouter from 'vue-router';

const route = [
  // path별 component를 추가한다.
  { path: '/patient',  },
];

const router = new VueRouter({
  mode: 'history',
  routes: route,
});

export default router;