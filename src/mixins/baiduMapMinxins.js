module.exports = {
    name: "baiduMap",
    data() {
        return {
            baiduMap: null,
            rootMap: "BMap"
        }
    },
    methods: {
        // 初始化地图对象
        setMap(id,rootMap=null) {
            if(id!=null) throw new Error("map id 不能为空");
            let dom = document.getElementById(id); 
            if(dom==null) throw new Error("当前id不能匹配某一节点dom");
            if(!rootMap && !this.rootMap) {
                throw new Error("rootMap is null");
            }
            if(rootMap) {
                this.rootMap = rootMap;
            }
            let map = new window[this.rootMap].Map(id);
            map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
            // 开启鼠标滚动
            map.enableScrollWheelZoom(true);
            this.baiduMap = map;
        },
        // 增加控件
        addControll(controller) {
            let ctrl = new window[this.rootMap][controller]();
            this.baiduMap.addControl(ctrl);
        },
        // 增加定点标记
        addIcon(iconPath, lng, lat, width = 50, height = 50) {
            let point = new window[this.rootMap].Point(lng, lat)
            let icon = new window[this.rootMap].Icon(iconPath, width, height)
            let marker = new window[this.rootMap].Marker(point, { icon })
            this.baiduMap.addOverlay(marker);
            return point;
        },
        // 线条
        addLine(pointArr) {
            let first = pointArr[0];
            let item = []
            if (first instanceof Array) {
                item = pointArr.map(v => {
                    return { lng: v[0], lat: v[1] }
                })
            } else {
                item = [...pointArr]
            }
            if (!new BMapGLLib.TrackAnimation) {
                console.error("the BMapGLLib.TrackAnimation is not exist!");
                return;
            }
            let pointList = [];
            item.forEach(ele => {
                pointList.push(new window[this.rootMap].Point(ele.lng, ele.lat));
            })
            let polyLine = new window[this.rootMap].Polyline(pointList);
            let trackAni = new BMapGLLib.TrackAnimation(this.baiduMap, polyLine, {
                overallView: true,
                tilt: 30,
                duration: 10000,
                delay: 200,
            })

            trackAni.start();
        },
        // 添加圆
        addCircle(lng, lat, radius = 100, style = {}) {
            let point = new window[this.rootMap].Point(lng, lat);
            let circle = new window[this.rootMap].Circle(point, radius, { ...style });
            this.baiduMap.addOverlay(circle)
        },
        // 添加多边形
        addPolygons() {

        },
        // 添加信息窗口
        addWindows(obj = {}) {
            let keySet = Object.keys(obj);
            if (!keySet.length) {
                return;
            }
            let point = this.addIcon(obj.iconPath, obj.lng, obj.lat, obj.iconWidth ? obj.iconWidth : 50, obj.iconHeight ? obj.iconHeight : 50);
            let marker = new window[this.rootMap].Marker(point);
            let opts = {
                width: obj.width ? obj.width : 200,
                height: obj.width ? obj.height : 100,
                title: obj.title ? obj.title : "信息"
            }
            let info = new window[this.rootMap].InfoWindow(obj.message, opts);
            marker.addEventListener("click", function () {
                this.baiduMap.openInfoWindow(info, point);
            })

        },
        //清除覆盖物
        remove_overlay() {
            this.baiduMap.clearOverlays();
        }
    }
}