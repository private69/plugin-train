// 添加类名
exports.addClass = (name, addName , stopTime = 5000) => {
  try {
    let dom;
    // 如果不是 dom 对象则获取相关对象
    if (!(name instanceof Object)) {
      if (document.querySelector(`#${name}`)) {
        dom = document.querySelector(`#${name}`);
      } else if (document.querySelector(`.${name}`)[0]) {
        dom = document.querySelector(`.${name}`)[0];
      } else {
        throw new Error("dom is not exist!")
      }
    } else {
      dom = name;
    }
    if (typeof (addName) === "string") {
      dom["className"] += ' ' + addName;
    } else if (addName instanceof Array) {
      dom["className"] += ' ' + addName.join(" ");
    }
    // 自动停止
    if(!stopTime) return ;
    setTimeout( () => {
      this.removeClass(dom , addName);
    },stopTime)
  } catch (error) {
    console.error(error.message);
  }

}
// 去除类名
exports.removeClass = (name, removeName) => {
  try {
    let dom;
    let classList = []; // 类名列表
    let goals = []; // 删除的列表
    // 获取对应对象
    if (!(name instanceof Object)) {
      if (document.querySelector(`#${name}`)) {
        dom = document.querySelector(`#${name}`);
      } else if (document.querySelector(`.${name}`)[0]) {
        dom = document.querySelector(`.${name}`)[0];
      } else {
        throw new Error("dom is not exist!")
      }
    } else {
      dom = name;
    }
    classList = dom["className"].split(" ");
    if (typeof (removeName) === "string") {
      goals = [...removeName.split(" ")];
    } else if (removeName instanceof Array) {
      goals = [...removeName]
    }
    goals.map(v => {
      let loc = classList.indexOf(v);
      loc !== -1 && classList.splice(loc, 1);
    })
    dom["className"] = classList.join(" ");
  } catch (error) {
    console.error(error.message);
  }

}