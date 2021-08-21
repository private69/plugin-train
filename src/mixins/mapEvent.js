
module.exports = {
  data() {
    return {
      events: {
        click: this.handleClick,

      }
    }
  },
  methods: {
    handleClick(e) {
      console.log(e);
    },
    // 鼠标移入
    handleMouseOver() {},
    // 滚轮滚动
    handleMouseWheel() {},
    // 鼠标移除
    handleMouseOut() {},
    // 鼠标右键单击
    handleRightClick() {},

  }
}