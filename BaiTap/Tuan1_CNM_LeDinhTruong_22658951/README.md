# Node.js + Express + EJS + MySQL với Docker

Project demo quản lý sản phẩm sử dụng Node.js, Express, EJS và MySQL chạy trên Docker.

## 📋 Kiến trúc tổng thể

```
IntelliJ IDEA / VS Code
│
├── Node.js + Express
│   ├── View Engine: EJS
│   ├── mysql2 (driver)
│   └── MVC Pattern
│
└── Docker
    └── MySQL Container (port 3306)
```

## 🛠️ Yêu cầu hệ thống

- **Node.js** LTS (>= 18.x)
- **Docker Desktop** (hoặc Docker Engine)
- **IntelliJ IDEA** (Ultimate hoặc Community) hoặc **VS Code**

### Kiểm tra cài đặt:

```bash
node -v
docker --version
```

## 🚀 Hướng dẫn cài đặt và chạy

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Khởi động MySQL bằng Docker

#### Cách 1: Sử dụng Docker Compose (Khuyến nghị)

```bash
docker-compose up -d
```

#### Cách 2: Sử dụng Docker command trực tiếp

```bash
docker run --name mysql-express-demo \
  -e MYSQL_ROOT_PASSWORD=123456 \
  -e MYSQL_DATABASE=shopdb \
  -p 3306:3306 \
  -d mysql:8.0
```

### 3. Kiểm tra MySQL container

```bash
# Xem danh sách container đang chạy
docker ps

# Kiểm tra kết nối MySQL
docker exec -it mysql-express-demo mysql -uroot -p123456

# Trong MySQL shell:
USE shopdb;
SHOW TABLES;
SELECT * FROM products;
```

### 4. Chạy ứng dụng Node.js

#### Cách 1: Sử dụng npm script

```bash
npm start
```

#### Cách 2: Chạy trực tiếp

```bash
node app.js
```

Hoặc nếu dùng `bin/www`:

```bash
node ./bin/www
```

### 5. Truy cập ứng dụng

Mở trình duyệt và truy cập: **http://localhost:3000**

## 📁 Cấu trúc thư mục

```
express-ejs-mysql/
│
├── app.js                 # File chính của Express
├── package.json           # Dependencies và scripts
├── docker-compose.yml     # Docker Compose configuration
├── init.sql              # SQL script khởi tạo database
│
├── db/
│   └── mysql.js          # Kết nối MySQL (connection pool)
│
├── models/
│   └── product.model.js  # Model layer (truy vấn database)
│
├── controllers/
│   └── product.controller.js  # Controller layer (xử lý logic)
│
├── routes/
│   └── product.routes.js # Route definitions
│
├── views/
│   ├── products.ejs      # View danh sách sản phẩm
│   └── product-form.ejs  # View form thêm/sửa sản phẩm
│
└── public/               # Static files (CSS, JS, images)
```

## 🎯 Tính năng

- ✅ **CRUD đầy đủ**: Create, Read, Update, Delete sản phẩm
- ✅ **MVC Pattern**: Tách biệt rõ ràng Model-View-Controller
- ✅ **Docker**: MySQL chạy trong container, dễ quản lý
- ✅ **UI đẹp**: Giao diện hiện đại, responsive
- ✅ **Validation**: Kiểm tra dữ liệu đầu vào
- ✅ **Error Handling**: Xử lý lỗi thân thiện

## 🔧 Cấu hình Database

File `db/mysql.js` sử dụng connection pool với các tham số:

- **Host**: localhost (MySQL chạy trong Docker nhưng map ra port 3306)
- **User**: root
- **Password**: 123456
- **Database**: shopdb

Có thể thay đổi bằng biến môi trường (xem `.env.example`).

## 📝 API Routes

| Method | Route | Mô tả |
|--------|-------|------|
| GET | `/` | Hiển thị danh sách sản phẩm |
| GET | `/add` | Form thêm sản phẩm mới |
| POST | `/add` | Thêm sản phẩm mới |
| GET | `/edit/:id` | Form chỉnh sửa sản phẩm |
| POST | `/edit/:id` | Cập nhật sản phẩm |
| GET | `/delete/:id` | Xóa sản phẩm |

## 🐛 Xử lý lỗi thường gặp

### 1. ECONNREFUSED 127.0.0.1:3306

**Nguyên nhân**: MySQL container chưa chạy

**Giải pháp**:
```bash
docker ps  # Kiểm tra container
docker start mysql-express-demo  # Khởi động container
```

### 2. Access denied for user 'root'

**Nguyên nhân**: Sai password hoặc user

**Giải pháp**: Kiểm tra lại password trong `db/mysql.js` và lúc tạo container

### 3. EJS không render

**Nguyên nhân**: Thiếu cấu hình view engine

**Giải pháp**: Kiểm tra trong `app.js`:
```javascript
app.set('view engine', 'ejs');
app.set('views', './views');
```

### 4. Cannot find module 'mysql2'

**Giải pháp**:
```bash
npm install mysql2
```

## 🔄 So sánh Node.js vs Java Servlet + JSP

| Tiêu chí | Node.js + Express + EJS | Java Servlet + JSP |
|----------|------------------------|-------------------|
| **Ngôn ngữ** | JavaScript (single language) | Java + JSP |
| **Performance** | Non-blocking I/O, tốt cho I/O-intensive | Thread-per-request, tốt cho CPU-intensive |
| **Cú pháp** | Đơn giản, dễ học | Phức tạp hơn, cần hiểu Java |
| **Ecosystem** | npm phong phú | Maven/Gradle, thư viện lớn |
| **Deployment** | Nhẹ, dễ deploy | Cần servlet container (Tomcat, etc.) |
| **Template Engine** | EJS, Handlebars, Pug | JSP, JSTL, Thymeleaf |
| **Database** | mysql2, pg, mongodb | JDBC, Hibernate, JPA |
| **Learning Curve** | Thấp | Cao |

## 📚 Tài liệu tham khảo

- [Express.js Documentation](https://expressjs.com/)
- [EJS Documentation](https://ejs.co/)
- [mysql2 Documentation](https://github.com/sidorares/node-mysql2)
- [Docker MySQL](https://hub.docker.com/_/mysql)

## 👨‍💻 Tác giả

**Lê Đình Trường** - 22658951

## 📄 License

MIT License

