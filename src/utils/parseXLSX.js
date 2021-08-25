const { read } = require("xlsx");
exports.showxlsx = function(data) {
  return new Promise( (resolve,reject) => {
    let options = { type: "binary" };
    const file = new FileReader();
    if (typeof FileReader === "undefined") {
      this.$message({
        type: "info",
        message: "您的浏览器不支持文件读取。"
      });
      return;
    }
    file.readAsBinaryString(data);
    file.onload = function(e){
      let result = e.target.result;
      try {
        let conn = read(result , options); 
        resolve(conn);
      } catch (error) {
        reject(error)
      }
    }
  })
}
exports.parse = function(obj) {
  let res = {} , merge = [];
  let header = [];
  // console.log(obj);
  Object.keys(obj).map( v => {
    if(v == "!margins" || v == "!ref") return ;
    if(v == "!merges") {
      obj[v].map( item => {
        merge.push(func(item));
      })
    }
    let [row , number] = [v.split("").slice(0,1) , v.split("").slice(1)];
    !res[row] && (res[row] = []);
    res[row][number] = obj[v]["v"];
  })
  for(let k in res){
    // console.log(k.charCodeAt());
    if(!(/[a-zA-Z]/.test(k))) continue;
    header.push({
      prop: k,
      label: k
    })
  }
  return {
    header,
    data: res,
    merge
  }
}
exports.readFile = function(filePath) {
  // 创建一个新的xhr对象
  let xhr = null;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    // eslint-disable-next-line
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  const okStatus = document.location.protocol === "file" ? 0 : 200;
  xhr.open("GET", filePath, false);
  xhr.overrideMimeType("text/html;charset=utf-8");
  xhr.send(null);
  return xhr.status === okStatus ? xhr.responseText : null;
}
function func(obj) {
  let result = []
  Object.keys(obj).map( v => {
    result.push([obj[v].r,obj[v].c]);
  })
  return result;
}