/**
 * 重複しない配列を返す
 * @param {Array}
 */
const getNonDuplicationArr = (arr) => {
  var nonDuplicationArr = arr.filter(function (element, index, self) {
    return self.indexOf(element) === index;
  });
  return nonDuplicationArr;
};

export default getNonDuplicationArr;
