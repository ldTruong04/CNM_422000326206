@echo off
REM Script khởi tạo MySQL Docker container cho project (Windows)

echo 🚀 Đang khởi động MySQL container...

REM Kiểm tra xem container đã tồn tại chưa
docker ps -a | findstr mysql-express-demo >nul
if %errorlevel% == 0 (
    echo 📦 Container mysql-express-demo đã tồn tại
    echo 🔄 Đang khởi động container...
    docker start mysql-express-demo
) else (
    echo 🆕 Đang tạo container mới...
    docker run --name mysql-express-demo -e MYSQL_ROOT_PASSWORD=123456 -e MYSQL_DATABASE=shopdb -p 3306:3306 -v %cd%\init.sql:/docker-entrypoint-initdb.d/init.sql -d mysql:8.0
)

echo ⏳ Đợi MySQL khởi động (10 giây)...
timeout /t 10 /nobreak >nul

echo ✅ MySQL container đã sẵn sàng!
echo 📊 Kiểm tra container:
docker ps | findstr mysql-express-demo

echo.
echo 🔍 Để kiểm tra kết nối MySQL:
echo    docker exec -it mysql-express-demo mysql -uroot -p123456

