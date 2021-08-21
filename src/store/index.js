import Vue from 'vue';
import vuex from 'vuex';
import map from './module/map';

Vue.use(vuex);

const store = new vuex.Store({
  modules: {
    map
  }
}) 

export default store;