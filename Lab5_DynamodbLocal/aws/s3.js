import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

const region = process.env.AWS_REGION || "us-east-1";
const bucket = process.env.S3_BUCKET || "";

export const s3Client = new S3Client({
  region,
  ...(process.env.AWS_ACCESS_KEY_ID &&
    process.env.AWS_SECRET_ACCESS_KEY && {
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    }),
});

export async function uploadToS3(key, body, contentType) {
  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    })
  );
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
}

export async function deleteFromS3(keyOrUrl) {
  let key = keyOrUrl;
  if (keyOrUrl.startsWith("http")) {
    try {
      const u = new URL(keyOrUrl);
      key = u.pathname.slice(1);
    } catch {
      return;
    }
  }
  await s3Client.send(
    new DeleteObjectCommand({ Bucket: bucket, Key: key })
  );
}
