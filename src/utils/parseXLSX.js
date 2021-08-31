const { read } = require("xlsx");
const mammoth = require("mammoth");
// 解析 word 文档 转化为 html 
exports.parseWord = function(input , options = {
  styleMap: ["comment-reference => sup"]
}) {
  return mammoth.convertToHtml(input, options);
}
// 解析 excel 文件
exports.showxlsx = function(data , type = "readAsBinaryString") {
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
    file[type](data);
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
exports.parse = function(params) {
  let SheetNames = params.SheetNames[0];
  if(!SheetNames) throw new Error("params error !");
  let obj = {...params.Sheets[SheetNames]};
  if(!obj) throw new Error(`${SheetNames} error !`);
  let res = {} , merge = [];
  let header = [];
  Object.keys(obj).map( v => {
    if(v == "!margins" || v == "!ref") return ;
    if(v == "!merges") {
      obj[v].map( item => {
        merge.push(getMergeMessage(item));
      })
      return ;
    }
    let [row , number] = [v.split("").slice(0,1) , v.split("").slice(1).join("")];
    !res[row] && (res[row] = []);
    res[row][number] = obj[v]["v"];
  })
  for(let k in res){
    if(!(/[a-zA-Z]/.test(k))) continue;
    header.push({
      prop: k,
      label: k
    })
  }
  return {
    header,
    data: res,
    merge: merge[0],
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
exports.showFileData = function(data , type = "readAsText") {
  return new Promise( (resolve,reject) => {
    const file = new FileReader();
    if (typeof FileReader === "undefined") {
      this.$message({
        type: "info",
        message: "您的浏览器不支持文件读取。"
      });
      return;
    }
    file[type](data);
    file.onload = function(e){
      try {
        let result = e.target.result;
        resolve(result);
      } catch (error) {
        reject(error)
      }
    }
  })
}
// 获取合并信息
function getMergeMessage(obj) {
  let result = []
  Object.keys(obj).map( v => {
    result.push([obj[v].r,obj[v].c]);
  })
  return result;
}