import { v4 as uuidv4 } from "uuid";
import * as Product from "../models/Product.js";
import { saveImage } from "../config/upload.js";

export async function list(req, res) {
  try {
    const products = await Product.findAll();
    res.render("index", { products });
  } catch (err) {
    console.error(err);
    res.status(500).render("index", { products: [], error: err.message });
  }
}

export function addForm(req, res) {
  res.render("add");
}

export async function create(req, res) {
  try {
    const name = (req.body.name || "").trim();
    const price = Number(req.body.price) || 0;
    if (!name) {
      return res.status(400).render("add", {
        error: "Vui lòng nhập tên sản phẩm",
        body: req.body,
      });
    }
    const id = uuidv4();
    const url_image = await saveImage(req.file, id);
    await Product.create({ id, name, price, url_image });
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).render("add", { error: err.message, body: req.body });
  }
}

export async function editForm(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).redirect("/");
    res.render("edit", { product });
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
}

export async function update(req, res) {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) return res.status(404).redirect("/");
    const name = (req.body.name || "").trim();
    const price = Number(req.body.price) || 0;
    if (!name) {
      return res.status(400).render("edit", {
        product: { ...product, name: req.body.name, price: req.body.price },
        error: "Vui lòng nhập tên sản phẩm",
      });
    }
    const url_image = await saveImage(req.file, id, product.url_image);
    await Product.update(id, { name, price, url_image });
    res.redirect("/");
  } catch (err) {
    console.error(err);
    const product = await Product.findById(req.params.id).catch(() => ({}));
    res.status(500).render("edit", {
      product: product || { id: req.params.id, ...req.body },
      error: err.message,
    });
  }
}

export async function remove(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (product?.url_image) {
  const { deleteImage } = await import("../config/upload.js");
  await deleteImage(product.url_image);
}
    await Product.remove(req.params.id);
  } catch (err) {
    console.error(err);
  }
  res.redirect("/");
}
