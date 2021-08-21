import Vue from 'vue'
import App from './App.vue'
import router from './router/index';
import store from './store/index';

import './plugin/elementUI';
import './plugin/vueAmap';
import './assets/css/global.css'
import './assets/css/icons/iconfont.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
