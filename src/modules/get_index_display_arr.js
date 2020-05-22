/**
 * 一覧で表示する配列を返す
 * @param {Object}
 */
export default function getIndexDisplayArr(_obj) {
  //キーだけ格納し，ソートするための配列生成
  var array = [];

  //for in文を使用してオブジェクトのキーだけ配列に格納
  for (let key in _obj) {
    //指定された名前のプロパティがオブジェクトにあるかどうかチェック
    if (_obj.hasOwnProperty(key)) {
      //if条件がtrueならば，配列の最後にキーを追加する
      array.push(key);
    }
  }

  //配列の逆ソート
  array.reverse();
  let array2 = [];
  for (let j = 0; j < array.length; j++) {
    array2.push(_obj[array[j]]);
  }

  return array2;
}
