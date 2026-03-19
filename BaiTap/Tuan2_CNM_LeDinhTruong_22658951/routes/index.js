var express = require('express');
var path = require('path');
var multer = require('multer');
var { v4: uuidv4 } = require('uuid');

var router = express.Router();

// Lưu trữ file ảnh vào thư mục public/images
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'public', 'images'));
  },
  filename: function (req, file, cb) {
    var ext = path.extname(file.originalname) || '.jpg';
    cb(null, uuidv4() + ext);
  }
});

var upload = multer({ storage: storage });

// Dữ liệu sản phẩm lưu tạm trong bộ nhớ (có sẵn một số dữ liệu mẫu)
var products = [
  {
    id: uuidv4(),
    name: 'iPhone 15 Pro',
    price: 29990000,
    quantity: 10,
    url_image: '' // có thể upload lại ảnh sau
  },
  {
    id: uuidv4(),
    name: 'Samsung Galaxy S24',
    price: 25990000,
    quantity: 8,
    url_image: ''
  },
  {
    id: uuidv4(),
    name: 'Tai nghe Bluetooth',
    price: 499000,
    quantity: 25,
    url_image: ''
  }
];

// Trang danh sách sản phẩm
router.get('/', function (req, res) {
  res.render('index', {
    title: 'Quản lý sản phẩm',
    products: products
  });
});

// Trang thêm sản phẩm
router.get('/products/new', function (req, res) {
  res.render('new', { title: 'Thêm sản phẩm mới' });
});

// Xử lý thêm sản phẩm
router.post('/products', upload.single('image'), function (req, res) {
  var id = uuidv4();
  var name = req.body.name;
  var price = parseFloat(req.body.price) || 0;
  var quantity = parseInt(req.body.quantity) || 0;

  var imageUrl = '';
  if (req.file) {
    // Đường dẫn ảnh để hiển thị trên web
    imageUrl = '/images/' + req.file.filename;
  }

  products.push({
    id: id,
    name: name,
    price: price,
    quantity: quantity,
    url_image: imageUrl
  });

  res.redirect('/');
});

// Trang chỉnh sửa sản phẩm
router.get('/products/:id/edit', function (req, res) {
  var id = req.params.id;
  var product = products.find(function (p) { return p.id === id; });

  if (!product) {
    return res.status(404).send('Sản phẩm không tồn tại');
  }

  res.render('edit', {
    title: 'Chỉnh sửa sản phẩm',
    product: product
  });
});

// Xử lý cập nhật sản phẩm
router.post('/products/:id', upload.single('image'), function (req, res) {
  var id = req.params.id;
  var product = products.find(function (p) { return p.id === id; });

  if (!product) {
    return res.status(404).send('Sản phẩm không tồn tại');
  }

  product.name = req.body.name;
  product.price = parseFloat(req.body.price) || 0;
  product.quantity = parseInt(req.body.quantity) || 0;

  if (req.file) {
    product.url_image = '/images/' + req.file.filename;
  }

  res.redirect('/');
});

// Xử lý xóa sản phẩm
router.post('/products/:id/delete', function (req, res) {
  var id = req.params.id;
  products = products.filter(function (p) { return p.id !== id; });
  res.redirect('/');
});

module.exports = router;
