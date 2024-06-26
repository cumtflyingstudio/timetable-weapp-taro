import moment from 'moment';

(Date.prototype as any).format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + '').substr(4 - RegExp.$1.length),
    );
  }

  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length),
      );
    }
  }

  return fmt;
};
function momentFormat(date: Date, fmt: string) {
  // if (!(date instanceof Date) && !(date instanceof Proxy)) {
  //   if (typeof date === 'string') {
  //     (date as string).replace(/\-/g, '/');
  //     date = new Date(date);
  //   }
  // }
  return moment(date as any).format(fmt);
}
export default momentFormat;
