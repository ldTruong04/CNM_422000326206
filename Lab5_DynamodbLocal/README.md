# CRUD Node.js – MVC, DynamoDB Local, Docker

Ứng dụng quản lý sản phẩm: Node.js, Express, EJS (MVC), **chỉ dùng DynamoDB Local** chạy trong Docker – **không kết nối AWS cloud**.

## Cấu trúc MVC

- **Models**: `models/Product.js` – thao tác bảng Products (id, name, price, url_image)
- **Views**: `views/*.ejs` – giao diện danh sách, thêm, sửa
- **Controllers**: `controllers/productController.js` – xử lý request/response
- **Routes**: `routes/product.js` – định tuyến

## Bảng Products (DynamoDB Local)

| Thuộc tính | Kiểu   | Mô tả                |
|------------|--------|----------------------|
| id         | String | Partition Key (UUID) |
| name       | String | Tên sản phẩm         |
| price      | Number | Giá                  |
| url_image  | String | Đường dẫn hình ảnh   |

## Chạy bằng Docker (chỉ DynamoDB Local)

```bash
docker-compose up --build
```

- **App**: http://localhost:3000  
- **DynamoDB Admin**: http://localhost:8001  

App trong Docker dùng **DynamoDB Local** (container `dynamodb-local`), credentials `local`/`local`, **không cần tài khoản AWS**. Bảng `Products` được tạo tự động khi khởi động. Ảnh sản phẩm lưu trong volume `public/uploads` (không dùng S3).

## Chạy app trên host (kết nối DynamoDB Local trong Docker)

1. Chạy DynamoDB Local:
   ```bash
   docker-compose up -d dynamodb-local
   ```
2. Tạo `.env` từ `.env.example` (chỉ cần `DYNAMODB_ENDPOINT=http://localhost:8000` và `local`/`local`).
3. Chạy app:
   ```bash
   npm install
   npm start
   ```
4. Mở http://localhost:3000

## Chức năng

- **Danh sách** (`/`) – bảng sản phẩm (hình, tên, giá), Thêm / Sửa / Xóa
- **Thêm** (`/add`) – form name, price, upload ảnh (lưu local)
- **Sửa** (`/edit/:id`) – sửa name, price, đổi ảnh
- **Xóa** (`/delete/:id`) – xóa sản phẩm và ảnh
