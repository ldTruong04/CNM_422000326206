# 🚀 Hướng dẫn nhanh

## Bước 1: Cài đặt dependencies

```bash
npm install
```

## Bước 2: Khởi động MySQL bằng Docker

### Option A: Sử dụng Docker Compose (Khuyến nghị)

```bash
npm run docker:up
```

hoặc

```bash
docker-compose up -d
```

### Option B: Sử dụng script

**Linux/Mac:**
```bash
./scripts/setup-docker.sh
```

**Windows:**
```bash
scripts\setup-docker.bat
```

### Option C: Docker command trực tiếp

```bash
docker run --name mysql-express-demo \
  -e MYSQL_ROOT_PASSWORD=123456 \
  -e MYSQL_DATABASE=shopdb \
  -p 3306:3306 \
  -d mysql:8.0
```

## Bước 3: Chạy ứng dụng

```bash
npm start
```

hoặc

```bash
npm run dev
```

## Bước 4: Truy cập

Mở trình duyệt: **http://localhost:3000**

## ✅ Kiểm tra MySQL

```bash
# Xem container đang chạy
docker ps

# Kết nối MySQL
docker exec -it mysql-express-demo mysql -uroot -p123456

# Trong MySQL shell:
USE shopdb;
SHOW TABLES;
SELECT * FROM products;
```

## 🛑 Dừng MySQL

```bash
npm run docker:down
```

hoặc

```bash
docker stop mysql-express-demo
```

## 📝 Lưu ý

- Đảm bảo Docker Desktop đang chạy
- Port 3306 không bị chiếm bởi ứng dụng khác
- Node.js >= 18.x

