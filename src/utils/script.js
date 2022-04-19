export const insertScript = function(url=null) {
    if(!url) {
        throw new Error("url is null!")
    }
    let body = document.getElementsByTagName("body")[0];
    let script = document.createElement("script");
    let noscript = document.createElement("noscript");
    script.type  = "text/javascript";
    script.src = url;
    noscript.innerText = "当前浏览器不支持script方式引入sdk，请切换浏览器！";
    body.appendChild(noscript);
    body.appendChild(script);
    return Promise.resolve(true);
}
export const insertLink = function(url=null) {
    if(!url) {
        throw new Error("url is null!")
    }
    let link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "type/css";
    link.href = url;
    document.head.appendChild(link);
    return Promise.resolve(true);
}