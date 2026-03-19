const Product = require("../models/productModel");
const fs = require("fs");
const path = require("path");
const { randomUUID } = require("crypto");

function removeLocalImage(imageUrl) {
  if (!imageUrl || !imageUrl.startsWith("/uploads/")) {
    return;
  }

  const relativePath = imageUrl.replace(/^\/+/, "");
  const imagePath = path.join(__dirname, "..", "public", relativePath);
  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
  }
}

function validateProductInput(body, fileRequired) {
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const price = Number(body.price);
  const unitInStock = Number(body.unit_in_stock);

  if (!name) {
    return "Product name is required.";
  }

  if (!Number.isFinite(price) || price < 0) {
    return "Price must be a non-negative number.";
  }

  if (!Number.isInteger(unitInStock) || unitInStock < 0) {
    return "Stock must be a non-negative integer.";
  }

  if (fileRequired) {
    return "Please upload a product image.";
  }

  return "";
}

exports.index = async (req, res) => {
  try {
    const keyword = typeof req.query.q === "string" ? req.query.q.trim() : "";
    const success = typeof req.query.success === "string" ? req.query.success : "";
    const error = typeof req.query.error === "string" ? req.query.error : "";

    const products = await Product.getAll();
    const filteredProducts = keyword
      ? products.filter((item) =>
          String(item.name || "")
            .toLowerCase()
            .includes(keyword.toLowerCase())
        )
      : products;

    filteredProducts.sort((a, b) => String(a.name || "").localeCompare(String(b.name || "")));

    res.render("products/index", {
      products: filteredProducts,
      keyword,
      success,
      error
    });
  } catch (err) {
    res.status(500).render("products/index", {
      products: [],
      keyword: "",
      success: "",
      error: `Failed to load products: ${err.message}`
    });
  }
};

exports.detail = async (req, res) => {
  try {
    const product = await Product.getById(req.params.id);
    if (!product) {
      res.redirect("/?error=Product%20not%20found.");
      return;
    }
    res.render("products/detail", { product, error: "" });
  } catch (err) {
    res.status(500).render("products/detail", { product: null, error: err.message });
  }
};

exports.createForm = (req, res) => {
  res.render("products/create", {
    error: "",
    formData: {
      name: "",
      price: "",
      unit_in_stock: ""
    }
  });
};

exports.create = async (req, res) => {
  try {
    const validationMessage = validateProductInput(req.body, !req.file);
    if (validationMessage) {
      res.status(400).render("products/create", {
        error: validationMessage,
        formData: {
          name: req.body.name || "",
          price: req.body.price || "",
          unit_in_stock: req.body.unit_in_stock || ""
        }
      });
      return;
    }

    const product = {
      id: randomUUID(),
      name: req.body.name.trim(),
      price: Number(req.body.price),
      unit_in_stock: Number(req.body.unit_in_stock),
      url_image: `/uploads/${req.file.filename}`
    };

    await Product.create(product);
    res.redirect("/?success=Product%20created%20successfully.");
  } catch (err) {
    if (req.file) {
      removeLocalImage(`/uploads/${req.file.filename}`);
    }

    res.status(500).render("products/create", {
      error: `Failed to create product: ${err.message}`,
      formData: {
        name: req.body.name || "",
        price: req.body.price || "",
        unit_in_stock: req.body.unit_in_stock || ""
      }
    });
  }
};

exports.editForm = async (req, res) => {
  try {
    const product = await Product.getById(req.params.id);
    if (!product) {
      res.redirect("/?error=Product%20not%20found.");
      return;
    }
    res.render("products/edit", { product, error: "" });
  } catch (err) {
    res.redirect(`/?error=${encodeURIComponent(`Failed to load product: ${err.message}`)}`);
  }
};

exports.update = async (req, res) => {
  try {
    const product = await Product.getById(req.params.id);
    if (!product) {
      if (req.file) {
        removeLocalImage(`/uploads/${req.file.filename}`);
      }
      res.redirect("/?error=Product%20not%20found.");
      return;
    }

    const validationMessage = validateProductInput(req.body, false);
    if (validationMessage) {
      if (req.file) {
        removeLocalImage(`/uploads/${req.file.filename}`);
      }

      res.status(400).render("products/edit", {
        error: validationMessage,
        product: {
          ...product,
          name: req.body.name || "",
          price: req.body.price || "",
          unit_in_stock: req.body.unit_in_stock || ""
        }
      });
      return;
    }

    const newImageUrl = req.file ? `/uploads/${req.file.filename}` : product.url_image;

    const updated = {
      id: product.id,
      name: req.body.name.trim(),
      price: Number(req.body.price),
      unit_in_stock: Number(req.body.unit_in_stock),
      url_image: newImageUrl
    };

    await Product.update(updated);

    if (req.file && product.url_image !== newImageUrl) {
      removeLocalImage(product.url_image);
    }

    res.redirect("/?success=Product%20updated%20successfully.");
  } catch (err) {
    if (req.file) {
      removeLocalImage(`/uploads/${req.file.filename}`);
    }

    res.redirect(`/?error=${encodeURIComponent(`Failed to update product: ${err.message}`)}`);
  }
};

exports.delete = async (req, res) => {
  try {
    const product = await Product.getById(req.params.id);

    if (!product) {
      res.redirect("/?error=Product%20not%20found.");
      return;
    }

    await Product.delete(req.params.id);
    removeLocalImage(product.url_image);

    res.redirect("/?success=Product%20deleted%20successfully.");
  } catch (err) {
    res.redirect(`/?error=${encodeURIComponent(`Failed to delete product: ${err.message}`)}`);
  }
};