import Vue from 'vue'
import VueRouter from 'vue-router';
import mocks from './mock'
import { addClass} from '../utils/animation'
import { init , messArea , percentageArea , coordinateAxis} from '../utils/canvasInit'
const loadingArr = [ 
  messArea , 
  percentageArea,
  coordinateAxis,

]
Vue.use(VueRouter);

const route = new VueRouter({
  routes: mocks
})
route.beforeEach((to,from,next) => {
  // 添加画布动画
  let { ctx } = init("#fff");
  loadingArr[Math.floor(Math.random() * loadingArr.length)].call('' , ctx , {color: "#000", time: 5});
  next();
})
// 后置路由，添加所有按钮的动画
route.afterEach(() => {
  if(!document) throw new Error("document is not exist !");
  let cb = (el) => {
    return () => {
      addClass(el , "animated infinite headShake", 1000);
    }
  }
  setTimeout( () => {
    let domList = document.getElementsByTagName("button");
    let size = domList.length , n = 0;
    while(n < size) {
      domList[n].addEventListener('click', cb(domList[n]));
      ++n;
    }
  },0)
})
export default route;