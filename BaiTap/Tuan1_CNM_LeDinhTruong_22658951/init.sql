-- Khởi tạo database và bảng products
USE shopdb;

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price DOUBLE NOT NULL,
  quantity INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Thêm dữ liệu mẫu (tùy chọn)
INSERT INTO products (name, price, quantity) VALUES
('Laptop Dell XPS 15', 25000000, 10),
('iPhone 15 Pro Max', 32000000, 5),
('Samsung Galaxy S24', 18000000, 8),
('MacBook Pro M3', 45000000, 3),
('iPad Air', 15000000, 12)
ON DUPLICATE KEY UPDATE name=name;

