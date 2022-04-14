import Vue from 'vue';
import VueAMap from 'vue-amap';

// 初始化高德地图
VueAMap.initAMapApiLoader({
  key: '', // 高德API申请的key
  plugin: [
    // 加载的插件
    'AMap.Autocomplete',
    'AMap.PlaceSearch',
    'AMap.Scale',
    'AMap.OverView',
    'AMap.ToolBar',
    'AMap.MapType',
    'AMap.PolyEditor',
    'AMap.CircleEditor',
    "AMap.Geolocation" // 定位控件，用来获取和展示用户主机所在的经纬度位置
  ],
})

Vue.use(VueAMap);

Vue.prototype.Map = VueAMap;