const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "..", "public", "uploads");
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const safeBaseName = path
      .basename(file.originalname, path.extname(file.originalname))
      .replace(/[^a-zA-Z0-9_-]/g, "-");
    const extension = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${safeBaseName}${extension}`);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Only image files are allowed."));
      return;
    }
    cb(null, true);
  }
});

function runCreateUpload(req, res, next) {
  upload.single("image")(req, res, (err) => {
    if (err) {
      res.status(400).render("products/create", {
        error: err.message,
        formData: {
          name: req.body.name || "",
          price: req.body.price || "",
          unit_in_stock: req.body.unit_in_stock || ""
        }
      });
      return;
    }
    next();
  });
}

function runEditUpload(req, res, next) {
  upload.single("image")(req, res, (err) => {
    if (err) {
      res.redirect(`/?error=${encodeURIComponent(err.message)}`);
      return;
    }
    next();
  });
}

router.get("/", productController.index);
router.get("/product/:id", productController.detail);

router.get("/create", productController.createForm);
router.post("/create", runCreateUpload, productController.create);

router.get("/edit/:id", productController.editForm);
router.post("/edit/:id", runEditUpload, productController.update);

router.delete("/product/:id", productController.delete);

module.exports = router;