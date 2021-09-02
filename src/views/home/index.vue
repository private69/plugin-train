<template>
  <div>
    <div style="width: 100%; height: 300px;"></div>
    <div>
      <component :is="cpmname"></component>
    </div>
  </div>
</template>
<script>
import timeCalculate from './component/timeCalculate.vue'
export default {
  components: { timeCalculate },
  data() {
    return {
      cpmname: 'timeCalculate'
    }
  },
  mounted() {
    let body = document.body;
    console.log(body);
    let canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    let height = window.innerHeight , width = window.innerWidth;
    canvas.style.background = "#000";
    canvas.style.position = "absolute";
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.width = width;
    canvas.height = height;
    ctx.fillStyle = "#fff";
    // ctx.font = "120px bold";
    body.appendChild(canvas);
    ctx.beginPath();
    let res = this.paintWater(width , height).reverse();
    let t = 0 , gap = 5;
    // res.map( (arr , i) => {
    //   if(i === 0) {
    //     ctx.moveTo(...arr);
    //   }else {
    //     ctx.lineTo(...arr);
    //   }
    // })
    // ctx.fill();
    const interval = setInterval( () => {
      if(t >= res.length) {
        clearInterval(interval);
        body.removeChild(canvas);
      }
      if(t === 0) {
        ctx.moveTo(...res[t]);
      }else {
        ctx.lineTo(...res[t]);
      }
      ctx.fill();
      // ctx.fillText('.' , Math.floor(Math.random() * width) , Math.floor(Math.random() * height));
      t += 1;
    }, gap)
  },
  methods: {
    paintWater(w , h) {
      let x = Math.floor(Math.random() * w) , y = Math.floor(Math.random() * h);
      let xl = x , xr = x , yl = y , yr = y;
      let result = [[x,y]]// [].push([x,y]);
      let times = 150 , ten = Math.floor(times/10) , three = Math.floor(times * 2 / 3);
      while(times) {
        if(times > (times - ten)) {
          xl -= 1; yl -= 0.5;
          xr += 1; yr -= 0.5;
          result.push([xl , yl] , [xr , yr ]);
        }
        else if(times > (times - three)) {
          xl -= 1; yl -= 0.5;
          xr += 1; yr -= 0.5;
          result.push([xl , yl] , [xr , yr]);
        }
        else if(times == 1) {
          result.push([x , yl - 1]);
        }
        else {
          xl +=1;xr -= 1;
          yl -=2;yr -=2;
          result.push([xl , yl] , [xr , yr]);
        }
        --times;
      }
      return result;
    }
  }
}
</script>
<style scoped>

</style>