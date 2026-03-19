const Product = require('../models/productModel');

exports.index = (req, res) => {
  const products = Product.all();
  res.render('products/index', { title: 'Products', products });
};

exports.new = (req, res) => {
  res.render('products/new', { title: 'Add Product' });
};

exports.create = (req, res) => {
  const item = Product.create(req.body);
  req.flash('success', 'Product created.');
  res.redirect('/products');
};

exports.edit = (req, res) => {
  const product = Product.findById(req.params.id);
  if (!product) return res.status(404).render('404', { title: 'Not Found' });
  res.render('products/edit', { title: 'Edit Product', product });
};

exports.update = (req, res) => {
  const updated = Product.update(req.params.id, req.body);
  if (!updated) {
    req.flash('error', 'Product not found');
    return res.redirect('/products');
  }
  req.flash('success', 'Product updated.');
  res.redirect('/products');
};

exports.delete = (req, res) => {
  const removed = Product.remove(req.params.id);
  if (!removed) req.flash('error', 'Product not found');
  else req.flash('success', 'Product deleted.');
  res.redirect('/products');
};
