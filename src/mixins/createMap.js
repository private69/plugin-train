
module.exports = {
    data() {
        return {
            mapObject: null,
            mapConfig: {},
        }
    },
    methods: {
        createMap(id) {
            if(id!=null) throw new Error("map id 不能为空");
            let dom = document.getElementById(id); 
            if(dom==null) throw new Error("当前id不能匹配某一节点dom");
            this.mapObject = new amap
        },
        // 获取map对象
        getMap() {
            return this.mapObject;
        },
        setMap(map) {
            this.mapObject = {...map};
        },
        // 设置map参数
        setConfig(obj = {}) {
            let keySet = Object.keys(obj);
            if(!keySet.length) return ;
            keySet.forEach( k => {
                this.mapConfig[k] = obj[k];
            })
        }
    }
}