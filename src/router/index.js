import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import MovieList from '../views/MovieList.vue';
import MovieDetail from '../views/MovieDetail.vue';

Vue.use(VueRouter);

/*
  route redirect 처리 방법
  {
    path: "해당 URL"
    redirect: "리다이렉트 URL"
  }
*/

const routes = [
  // {
  //   path: "/",
  //   redirect: "/MovieList"
  // },
  {
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/MovieList',
    name: 'MovieList',
    component: MovieList
  }, {
    path: '/MovieDetail/:id',
    name: 'MovieDetail',
    component: MovieDetail,
  }
];

/*
  router mode default는 hash
*/
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;


// {
//   path: '/about',
//   name: 'About',
//   // route level code-splitting
//   // this generates a separate chunk (about.[hash].js) for this route
//   // which is lazy-loaded when the route is visited.
//   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
// }