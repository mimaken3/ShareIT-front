import env from "env";

// アイコンのURLを取得
export default async function getIconURL(iconName) {
  var AWS = require("aws-sdk");
  var s3 = new AWS.S3({
    accessKeyId: env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_S3_SECRET_ACCESS_KEY,
    region: "ap-northeast-1",
  });

  var params = {
    Bucket: env.AWS_S3_BUCKET_NAME,
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
