// 获取月份
exports.getYear = function(date) {
  let result = new Date(date).getFullYear();
  return result;
}
// 获取月份
exports.getMonths = function(date) {
  let result = new Date(date).getMonth() + 1;
  return result;
  // return result > 10? result: '0' + result;
}
// 获取日期
exports.getDate = function(date) {
  let result = new Date(date).getDate();
  return result;
  // return result > 10? result: '0' + result;
}
// 获取月份天数
exports.getDays = function (year = null, month = null ) {
  !year && (year = new Date().getFullYear());
  !month && (month = new Date().getMonth() + 1);
  return new Date(year , month , 0).getDate();
}
// 连接时间
exports.concatTime = function (year = null , month = null , date = null) {
  !year && (year = new Date().getFullYear());
  !month && (month = new Date().getMonth() + 1);
  !date && (date = new Date().getDate());
  
  month < 10 && (month = '0' + month);
  date < 10 && (date = '0' + date);
  return year + '-' + month + '-' + date;
}