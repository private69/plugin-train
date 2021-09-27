
module.exports = {
  data() {
    return {}
  },
  methods: {},
  beforeRouteEnter(to, from, next) {
    console.log("aaa");
    next();
  }
}