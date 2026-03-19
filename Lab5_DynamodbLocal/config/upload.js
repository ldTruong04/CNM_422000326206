import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadDir = path.join(__dirname, "..", "public", "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

/** Lưu ảnh: S3 nếu có S3_BUCKET, không thì lưu local vào public/uploads */
export async function saveImage(file, id, currentUrl = "") {
  if (!file?.buffer) return currentUrl || "";
  const ext = file.mimetype === "image/png" ? "png" : "jpg";
  const filename = `${id}.${ext}`;

  if (process.env.S3_BUCKET) {
    const { uploadToS3, deleteFromS3 } = await import("../aws/s3.js");
    if (currentUrl) await deleteFromS3(currentUrl).catch(() => {});
    return await uploadToS3(`products/${filename}`, file.buffer, file.mimetype);
  }

  const filepath = path.join(uploadDir, filename);
  fs.writeFileSync(filepath, file.buffer);
  if (currentUrl && currentUrl.startsWith("/uploads/")) {
    const oldPath = path.join(__dirname, "..", "public", currentUrl);
    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
  }
  return "/uploads/" + filename;
}

/** Xóa ảnh (S3 URL hoặc path /uploads/...) */
export async function deleteImage(urlOrPath) {
  if (!urlOrPath) return;
  if (urlOrPath.startsWith("http") && process.env.S3_BUCKET) {
    const { deleteFromS3 } = await import("../aws/s3.js");
    await deleteFromS3(urlOrPath).catch(() => {});
    return;
  }
  if (urlOrPath.startsWith("/uploads/")) {
    const filepath = path.join(__dirname, "..", "public", urlOrPath);
    if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
  }
}
