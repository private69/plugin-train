let canvasDom;
function init(bg = "#000") {
  let body = document.body;
  let canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  let height = window.innerHeight, width = window.innerWidth;
  canvas.style.background = bg;
  canvas.style.position = "absolute";
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.width = width;
  canvas.height = height;
  canvasDom = canvas;
  canvas.style.zIndex = 9999;
  body.appendChild(canvas);
  return { canvas: canvas, ctx: ctx };
}
function clear (dom) {
  let body = document.body;
  body.removeChild(dom);
}
function messArea (ctx , style = { color : "fff" , time : 10} ) {
  let h = window.innerHeight, w = window.innerWidth;
  let x = Math.ceil(Math.random() * w), y = Math.ceil(Math.random() * h);
  let result = [[x, y]];
  let t = 0 , gap = style.time;
  let times = 100;
  while (times) {
    result.push([Math.ceil(Math.random() * w), Math.ceil(Math.random() * h)])
    --times;
  }
  ctx.beginPath();
  ctx.fillStyle = style.color;
  const interval = setInterval( () => {
    if(t >= result.length) {
      clearInterval(interval);
      clear(canvasDom);
    }
    if(t === 0) {
      ctx.moveTo(...result[t]);
    }else {
      ctx.lineTo(...result[t]);
    }
    ctx.fill();
    t += 1;
  }, gap)
}
function percentageArea(ctx , gap = 10) {
  let t = 0 ;
  let height = window.innerHeight, width = window.innerWidth;
  const interval = setInterval( () => {
    if(t > 100) {
      clearInterval(interval);
      clear(canvasDom);
    }
    if(t) {
      // 清空画布内容
      canvasDom.width = width;
      canvasDom.height = height;
    }
    ctx.font = "20px bold";
    ctx.fillText(t + ' %' , Math.floor( width / 2) , Math.floor(height / 2));
    t += 1;
  }, gap)
}
function coordinateAxis(ctx , style = { color : "#000" , time : 10} ) {
  let h = window.innerHeight, w = window.innerWidth;
  let center = [Math.floor(w/2) , Math.floor(h/2)], r = 500;
  let t = 0, gap = style.time;
  ctx.beginPath();
  ctx.strokeStyle  = style.color;
  paintLine(ctx , [ [ center[0] ,0 ] , [center[0] ,h ]]);
  paintLine(ctx , [ [ 0 ,center[1] ] , [w, center[1] ]]);
  
  paintLine(ctx , [ [ w ,center[1] ] , [w - 10, center[1] - 10 ]]);
  
  paintLine(ctx , [ [ w ,center[1] ] , [w - 10, center[1] + 10 ]]);
  
  paintLine(ctx , [ [ center[0] , 0 ] , [center[0] - 10, 10 ]]);
  
  paintLine(ctx , [ [ center[0] , 0 ] , [center[0] + 10, 10 ]]);

  let axis = function (w, n , max) {
    let res = [];
    for(let i = 0 ; i < n; i += 10){
      if(w-i < 0) break;
      res.push(w - i)
    }
    res = res.reverse();
    for(let i = 0 ; i < n; i += 10){
      if(w + i > max) break;
      res.push(w + i);
    }
    return res;
  }
  let [row , col] = [axis(center[0] , r , w) , axis(center[1] , r , h)];
  const interval = setInterval( () => {
    if(t >= Math.min(row.length , col.length)) {
      clearInterval(interval);
      clear(canvasDom);
    }
    paintLine(ctx ,[ [row[t] , center[1]] , [row[t] , center[1] - 10 ]] )
    
    paintLine(ctx ,[ [center[0] , col[t]] , [center[0] - 10, col[t] ]] )
    t += 1;
  }, gap)
}
// 划线
function paintLine(ctx , arr) {
  arr.map( (v , i) => {
    if(!i) {
      ctx.moveTo(...v)
    }else {
      ctx.lineTo(...v)
    }
  })
  ctx.stroke();
}
// 初始化画布
exports.init = init;
// 移除
exports.clear = clear; 
// 绘制混乱区域
exports.messArea = messArea;
// 百分比
exports.percentageArea = percentageArea;
// 划线
exports.coordinateAxis = coordinateAxis;