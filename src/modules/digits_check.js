/**
 * 時間の桁数を2ケタにする
 * @param {string}
 */
const digitsCheck = (num) => {
  if (num.length === 1) {
    num = "0" + num;
  }
  return num;
};

export default digitsCheck;
