// アイコンのURLを取得
export default async function getIconURL(iconName) {
  var AWS = require("aws-sdk");
  var s3 = new AWS.S3({
    accessKeyId: process.env.REACT_APP_AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_S3_SECRET_ACCESS_KEY,
    region: "ap-northeast-1",
  });

  var params = {
    Bucket: "share-it-test",
    Key: "user-icons/" + iconName,
  };

  try {
    const url = await new Promise((resolve, reject) => {
      s3.getSignedUrl("getObject", params, function (err, url) {
        if (err) {
          reject(err);
        }
        resolve(url);
      });
    });
    return url;
  } catch (err) {
    console.log("s3 getObject,  get signedUrl failed");
    throw err;
  }
}
