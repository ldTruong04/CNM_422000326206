const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

// Home - Hiển thị danh sách sản phẩm
router.get('/', productController.index.bind(productController));

// Form thêm sản phẩm
router.get('/add', productController.showAddForm.bind(productController));

// Thêm sản phẩm
router.post('/add', productController.add.bind(productController));

// Form chỉnh sửa sản phẩm
router.get('/edit/:id', productController.showEditForm.bind(productController));

// Cập nhật sản phẩm
router.post('/edit/:id', productController.update.bind(productController));

// Xóa sản phẩm
router.get('/delete/:id', productController.delete.bind(productController));

module.exports = router;

