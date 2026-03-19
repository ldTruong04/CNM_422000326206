#!/bin/bash

# Script khởi tạo MySQL Docker container cho project

echo "🚀 Đang khởi động MySQL container..."

# Kiểm tra xem container đã tồn tại chưa
if docker ps -a | grep -q mysql-express-demo; then
    echo "📦 Container mysql-express-demo đã tồn tại"
    echo "🔄 Đang khởi động container..."
    docker start mysql-express-demo
else
    echo "🆕 Đang tạo container mới..."
    docker run --name mysql-express-demo \
      -e MYSQL_ROOT_PASSWORD=123456 \
      -e MYSQL_DATABASE=shopdb \
      -p 3306:3306 \
      -v $(pwd)/init.sql:/docker-entrypoint-initdb.d/init.sql \
      -d mysql:8.0
fi

echo "⏳ Đợi MySQL khởi động (10 giây)..."
sleep 10

echo "✅ MySQL container đã sẵn sàng!"
echo "📊 Kiểm tra container:"
docker ps | grep mysql-express-demo

echo ""
echo "🔍 Để kiểm tra kết nối MySQL:"
echo "   docker exec -it mysql-express-demo mysql -uroot -p123456"

