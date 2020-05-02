// イテレータ付きのオブジェクト配列を返す
export default function getIteratoredObjArr(objArr) {
  objArr[Symbol.iterator] = function () {
    let index = 0;
    return {
      next() {
        if (objArr.length <= index) {
          return { done: true };
        } else {
          return { value: objArr[index++] };
        }
      },
    };
  };

  const iterator = objArr[Symbol.iterator]();

  let iteratoredObjArr = [];
  let i = 0;
  while (true) {
    if (i === Object.values(objArr).length) break;
    let comment = iterator.next();

    if (!(comment["value"] === undefined)) {
      i++;
      iteratoredObjArr.push(comment["value"]);
    }
  }

  return iteratoredObjArr;
}
