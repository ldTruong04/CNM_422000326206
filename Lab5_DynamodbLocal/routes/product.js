import express from "express";
import multer from "multer";
import * as productController from "../controllers/productController.js";

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.get("/", productController.list);
router.get("/add", productController.addForm);
router.post("/add", upload.single("image"), productController.create);
router.get("/edit/:id", productController.editForm);
router.post("/edit/:id", upload.single("image"), productController.update);
router.get("/delete/:id", productController.remove);

export default router;
