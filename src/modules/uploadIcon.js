import S3 from "react-aws-s3";
import env from "env";

// アイコンをアップロード
export default async function uploadIcon(iconImage, newFileName) {
  const iconImageConfig = {
    bucketName: env.AWS_S3_BUCKET_NAME,
    dirName: "user-icons",
    region: "ap-northeast-1",
    accessKeyId: env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_S3_SECRET_ACCESS_KEY,
  };

  const ReactS3Client = new S3(iconImageConfig);

  ReactS3Client.uploadFile(iconImage, newFileName)
    .then((data) => console.log(data))
    .catch((err) => console.error(err));
}
