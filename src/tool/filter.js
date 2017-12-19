import Vue from 'vue';

// global filters
Vue.filter('onlinestatus', function (value) {
  switch (value) {
    case 1:
      return "休息中"
      break;
    case 2:
      return "营业中";
    default:
      return null;
      break;
  }
})
Vue.filter('weekday', function (value, emptyText) {
  switch (value) {
    case 1:
      return "周一"
      break;
    case 2:
      return "周二";
    case 3:
      return "周三"
      break;
    case 4:
      return "周四";
    case 5:
      return "周五"
      break;
    case 6:
      return "周六";
    case 6:
      return "周天";
    default:
      return value || emptyText;
      break;
  }
})
Vue.filter('orderstatus', function (value) {
  switch (value) {
    case 1:
      return "待确认"
      break;
    case 2:
      return "待支付";
    case 3:
      return "待咨询"
      break;
    case 4:
      return "咨询完成";
    case 5:
      return "已评价"
      break;
    case -1:
      return "已取消";
    case -2:
      return "已拒绝";
    default:
      return "已取消"
      break;
  }
})
Vue.filter("datetime", function (date, fmt) {
  if (!date) return null;
  if (Date.parse(date).toString() === "NaN") return date;

  date = new Date(date);
  var o = {
    "M+": date.getMonth() + 1, //月份   
    "d+": date.getDate(), //日   
    "H+": date.getHours(), //小时   
    "m+": date.getMinutes(), //分   
    "s+": date.getSeconds(), //秒   
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
    "S": date.getMilliseconds() //毫秒   
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  console.log(fmt);
  return fmt;
})

export default {}
