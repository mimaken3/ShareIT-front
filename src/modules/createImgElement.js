/**
 * src属性がdataURLのimg要素を取得
 * @param {string}} dataURL - base64-dataURL
 */
const createImgElement = (dataURL) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
    image.src = dataURL;
  });

export default createImgElement;
