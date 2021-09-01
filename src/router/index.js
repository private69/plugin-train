import Vue from 'vue'
import VueRouter from 'vue-router';
import mocks from './mock'
Vue.use(VueRouter);

const route = new VueRouter({
  routes: mocks
})
route.beforeEach((to,from,next) => {
  window.onloadeddata
  next();
})
// route.afterEach((to,from) => {
  
// })
export default route;