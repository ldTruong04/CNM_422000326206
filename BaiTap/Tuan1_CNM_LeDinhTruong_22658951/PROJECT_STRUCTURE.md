# 📁 Cấu trúc Project

## Tổng quan

```
express-ejs-mysql/
│
├── 📄 app.js                    # Express application chính
├── 📄 package.json              # Dependencies và scripts
├── 📄 docker-compose.yml        # Docker Compose config
├── 📄 init.sql                  # SQL script khởi tạo database
├── 📄 README.md                 # Hướng dẫn chi tiết
├── 📄 QUICKSTART.md             # Hướng dẫn nhanh
├── 📄 COMPARISON.md             # So sánh Node.js vs Java
├── 📄 PROJECT_STRUCTURE.md       # File này
│
├── 📁 bin/
│   └── www                      # Server entry point
│
├── 📁 db/
│   └── mysql.js                 # MySQL connection pool
│
├── 📁 models/
│   └── product.model.js         # Model layer (database operations)
│
├── 📁 controllers/
│   └── product.controller.js   # Controller layer (business logic)
│
├── 📁 routes/
│   ├── product.routes.js        # Route definitions
│   ├── index.js                 # (legacy)
│   └── users.js                 # (legacy)
│
├── 📁 views/
│   ├── products.ejs             # View danh sách sản phẩm
│   ├── product-form.ejs         # View form thêm/sửa
│   ├── index.ejs                # (legacy)
│   └── error.ejs                # Error page
│
├── 📁 public/                   # Static files
│   ├── stylesheets/
│   ├── javascripts/
│   └── images/
│
└── 📁 scripts/                  # Utility scripts
    ├── setup-docker.sh          # Linux/Mac setup script
    └── setup-docker.bat         # Windows setup script
```

## Kiến trúc MVC

### Model (`models/product.model.js`)
- Chịu trách nhiệm truy vấn database
- Các method: `getAll()`, `getById()`, `create()`, `update()`, `delete()`

### View (`views/*.ejs`)
- Hiển thị dữ liệu cho user
- `products.ejs`: Danh sách sản phẩm
- `product-form.ejs`: Form thêm/sửa sản phẩm

### Controller (`controllers/product.controller.js`)
- Xử lý logic nghiệp vụ
- Nhận request từ routes
- Gọi Model để lấy dữ liệu
- Render View với dữ liệu

### Routes (`routes/product.routes.js`)
- Định nghĩa các endpoint
- Map URL patterns với Controller methods

## Flow xử lý request

```
1. Client Request (GET /)
   ↓
2. Express Router (routes/product.routes.js)
   ↓
3. Controller (controllers/product.controller.js)
   ↓
4. Model (models/product.model.js)
   ↓
5. Database (MySQL via db/mysql.js)
   ↓
6. Model returns data
   ↓
7. Controller renders View (views/products.ejs)
   ↓
8. HTML Response to Client
```

## Database Schema

```sql
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price DOUBLE NOT NULL,
  quantity INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Dependencies chính

- **express**: Web framework
- **ejs**: Template engine
- **mysql2**: MySQL driver (promise-based)
- **express-session**: Session management (đã cài, chưa dùng)
- **morgan**: HTTP request logger
- **cookie-parser**: Parse cookies

## Environment Variables (Optional)

Có thể tạo file `.env`:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123456
DB_NAME=shopdb
PORT=3000
NODE_ENV=development
```

File `db/mysql.js` đã hỗ trợ đọc từ `process.env`.

