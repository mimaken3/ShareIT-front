/**
 * 0以上の整数かどうかを判定
 * @param {string}
 */
export default function isNumber(val) {
  var regexp = new RegExp(/^[0-9]+(\.[0-9]+)?$/);
  return regexp.test(val);
}
