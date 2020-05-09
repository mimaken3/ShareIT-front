/**
 * base64のdataURLをFileオブジェクトに変換
 * @param {string} base64-dataURL
 */
export default function dataURLtoFile(dataURL) {
  var arr = dataURL.split(","),
    // ファイルを表す情報を取得
    mime = arr[0].match(/:(.*?);/)[1],
    // base64形式でエンコードされたデータの文字列をデコード
    decodedData = atob(arr[1]),
    n = decodedData.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    // ユニコードを10進数に変換して代入
    u8arr[n] = decodedData.charCodeAt(n);
  }

  const fileName = "result." + mime.split("/")[1];

  return new File([u8arr], fileName, { type: mime });
}
