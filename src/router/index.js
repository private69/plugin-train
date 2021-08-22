import Vue from 'vue'
import VueRouter from 'vue-router';
import mocks from './mock'
Vue.use(VueRouter);

export default new VueRouter({
  routes: mocks
})