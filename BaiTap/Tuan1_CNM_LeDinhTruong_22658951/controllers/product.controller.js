const Product = require('../models/product.model');

class ProductController {
  // Hiển thị danh sách sản phẩm
  async index(req, res) {
    try {
      const products = await Product.getAll();
      res.render('products', { 
        products, 
        error: res.locals.error, 
        success: res.locals.success 
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      res.render('products', { 
        products: [], 
        error: res.locals.error || 'Lỗi khi tải danh sách sản phẩm',
        success: res.locals.success 
      });
    }
  }

  // Hiển thị form thêm sản phẩm
  showAddForm(req, res) {
    res.render('product-form', { product: null, error: null });
  }

  // Thêm sản phẩm mới
  async add(req, res) {
    try {
      const { name, price, quantity } = req.body;
      
      // Validation
      if (!name || !price || !quantity) {
        return res.render('product-form', {
          product: null,
          error: 'Vui lòng điền đầy đủ thông tin'
        });
      }

      await Product.create(name, parseFloat(price), parseInt(quantity));
      res.redirect('/?success=Thêm sản phẩm thành công');
    } catch (error) {
      console.error('Error adding product:', error);
      res.render('product-form', {
        product: null,
        error: 'Lỗi khi thêm sản phẩm: ' + error.message
      });
    }
  }

  // Hiển thị form chỉnh sửa
  async showEditForm(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.getById(id);
      
      if (!product) {
        return res.redirect('/?error=Sản phẩm không tồn tại');
      }

      res.render('product-form', { product, error: null });
    } catch (error) {
      console.error('Error fetching product:', error);
      res.redirect('/?error=Lỗi khi tải thông tin sản phẩm');
    }
  }

  // Cập nhật sản phẩm
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, price, quantity } = req.body;

      // Validation
      if (!name || !price || !quantity) {
        const product = await Product.getById(id);
        return res.render('product-form', {
          product,
          error: 'Vui lòng điền đầy đủ thông tin'
        });
      }

      await Product.update(id, name, parseFloat(price), parseInt(quantity));
      res.redirect('/?success=Cập nhật sản phẩm thành công');
    } catch (error) {
      console.error('Error updating product:', error);
      res.redirect('/?error=Lỗi khi cập nhật sản phẩm');
    }
  }

  // Xóa sản phẩm
  async delete(req, res) {
    try {
      const { id } = req.params;
      await Product.delete(id);
      res.redirect('/?success=Xóa sản phẩm thành công');
    } catch (error) {
      console.error('Error deleting product:', error);
      res.redirect('/?error=Lỗi khi xóa sản phẩm');
    }
  }
}

module.exports = new ProductController();

