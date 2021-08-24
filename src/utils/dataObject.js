// 生成 blob 对象
function createBlob(data) {
  const blob = new Blob([data], { type: "utf-8" });
  const downloadURL = window.URL.createObjectURL(blob);
  return downloadURL;
}
// 自动下载 url：文件内容/下载链接，filename：文件名称，ifUrl：url 是否是链接
function down(url, filename , ifUrl = false) {
  let href = null;
  if (ifUrl) {
    href = url;
  } else {
    href = createBlob(url);
  }
  const a = document.createElement("a");
  a.download = (filename || Math.round(Math.random() * 50 * 1000).toString() )+ ".md";
  a.href = href;
  a.click();
}
module.exports = {
  createBlob , 
  down
}