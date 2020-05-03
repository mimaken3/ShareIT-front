import env from "env";

// アイコンを削除
export default async function deleteIcon(deleteFileName) {
  var AWS = require("aws-sdk");

  // Create S3 service object
  let s3 = new AWS.S3({
    accessKeyId: env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_S3_SECRET_ACCESS_KEY,
    region: "ap-northeast-1",
  });

  // Create params for S3.deleteObject
  var params = {
    Bucket: "share-it-test",
    Key: "user-icons/" + deleteFileName,
  };

  // Call S3 to delete the bucket
  try {
    await new Promise((resolve, reject) => {
      s3.deleteObject(params, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  } catch (err) {
    throw err;
  }
}
