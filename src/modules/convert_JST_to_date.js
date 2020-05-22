/**
 * 年月日時分の作成日
 * @param {string}}
 */

const check = (num) => {
  if (num.length === 1) {
    num = "0" + num;
  }
  return num;
};

export default function convertJSTToDate(createdDate) {
  // 作成日が年月日時分(JST)をDate型の文字列で返す
  // TODO: 要改修！
  const year = check(createdDate.match(/(.*)年/)[1]);
  const month = check(createdDate.match(/年(.*)月/)[1]);
  const day = check(createdDate.match(/月(.*)日/)[1]);
  const hour = check(createdDate.match(/ (.*)時/)[1]);
  const minute = check(createdDate.match(/時(.*)分/)[1]);
  const second = check(createdDate.match(/分(.*)秒/)[1]);
  const result =
    year +
    "-" +
    month +
    "-" +
    day +
    "T" +
    hour +
    ":" +
    minute +
    ":" +
    second +
    "Z";

  return result;
}
