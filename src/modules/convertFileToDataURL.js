/**
 * 画像のdataURLを取得
 * @param {File}}
 */
export default function convertFileToDataURL(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}
