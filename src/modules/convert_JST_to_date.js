import digitsCheck from "./digits_check";

/**
 * 年月日時分の作成日
 * @param {string}}
 */
export default function convertJSTToDate(createdDate) {
  const date = createdDate.split(" ");
  const time = date[1].split(":");

  // 作成日が年月日時分(JST)をDate型の文字列で返す
  // TODO: 要改修！
  const year = digitsCheck(createdDate.match(/(.*)年/)[1]);
  const month = digitsCheck(createdDate.match(/年(.*)月/)[1]);
  const day = digitsCheck(createdDate.match(/月(.*)日/)[1]);

  // 時間を設定
  const hour = time[0];
  const minute = time[1];
  const second = time[2];

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
