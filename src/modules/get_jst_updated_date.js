import digitsCheck from "./digits_check";

/**
 * @param {Object}
 */
export default function getJSTUpdatedDateArr(obj) {
  // 更新日が年月日時分(JST)を返す
  if (obj && Object.values(obj).length > 0) {
    if (0 in obj) {
      // オブジェクトのオブジェクトの場合
      for (let i = 0; i < Object.values(obj).length; i++) {
        const jstDateStr = Date.parse(
          obj[i].updated_date.replace("Z", "+09:00")
        );
        const jstDate = new Date(jstDateStr);
        const year = jstDate.getFullYear();
        const month = jstDate.getMonth() + 1;
        const day = jstDate.getDate();
        const hour = digitsCheck(jstDate.getHours().toString());
        const minutes = digitsCheck(jstDate.getMinutes().toString());
        const second = digitsCheck(jstDate.getSeconds().toString());
        obj[i].updated_date =
          year +
          "年" +
          month +
          "月" +
          day +
          "日 " +
          hour +
          ":" +
          minutes +
          ":" +
          second;
      }
    } else {
      // オブジェクトの場合
      const jstDateStr = Date.parse(obj.updated_date.replace("Z", "+09:00"));
      const jstDate = new Date(jstDateStr);
      const year = jstDate.getFullYear();
      const month = jstDate.getMonth() + 1;
      const day = jstDate.getDate();
      const hour = digitsCheck(jstDate.getHours().toString());
      const minutes = digitsCheck(jstDate.getMinutes().toString());
      const second = digitsCheck(jstDate.getSeconds().toString());
      obj.updated_date =
        year +
        "年" +
        month +
        "月" +
        day +
        "日 " +
        hour +
        ":" +
        minutes +
        ":" +
        second;
    }
  }
  return obj;
}
