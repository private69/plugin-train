import Vue from 'vue'
import App from './App.vue'
import router from './router/index';
import store from './store/index';

import './plugin/elementUI';
import './plugin/vueAmap';
import './plugin/vueTreeSelect'
import './plugin/mavonEditor'
import './plugin/echarts';

import './assets/css/global.css'
import './assets/css/icons/iconfont.css'

import {addClass, removeClass} from './utils/animation'
// import './utils/mouseMonitor'
Vue.prototype.addClass = addClass;
Vue.prototype.removeClass = removeClass;

Vue.config.productionTip = false

// import animate from "animate.css";
import "animate.css";
// Vue.use(animate);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
