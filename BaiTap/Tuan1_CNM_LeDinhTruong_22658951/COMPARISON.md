# 📊 So sánh Node.js + Express + EJS vs Java Servlet + JSP

## 1. Tổng quan kiến trúc

### Node.js + Express + EJS
```
Client Request
    ↓
Express Server (Single-threaded, Event Loop)
    ↓
Routes → Controllers → Models → MySQL
    ↓
EJS Template Engine
    ↓
HTML Response
```

### Java Servlet + JSP
```
Client Request
    ↓
Web Server (Tomcat/Jetty)
    ↓
Servlet Container (Multi-threaded)
    ↓
Servlet → Service → DAO → JDBC → MySQL
    ↓
JSP Template Engine
    ↓
HTML Response
```

## 2. So sánh chi tiết

| Tiêu chí | Node.js + Express + EJS | Java Servlet + JSP |
|----------|------------------------|-------------------|
| **Ngôn ngữ** | JavaScript (single language) | Java + JSP (mixed) |
| **Paradigm** | Event-driven, Non-blocking I/O | Thread-per-request, Blocking I/O |
| **Performance** | ⭐⭐⭐⭐⭐ Tốt cho I/O-intensive apps | ⭐⭐⭐⭐ Tốt cho CPU-intensive apps |
| **Concurrency Model** | Single-threaded với Event Loop | Multi-threaded (thread pool) |
| **Learning Curve** | ⭐⭐ Dễ học (JavaScript) | ⭐⭐⭐⭐ Khó hơn (Java + Servlet API) |
| **Code Example** | Ngắn gọn, dễ đọc | Dài dòng hơn, boilerplate nhiều |

## 3. Code Comparison

### 3.1 Tạo Server

**Node.js + Express:**
```javascript
const express = require('express');
const app = express();
app.listen(3000, () => console.log('Server running'));
```

**Java Servlet:**
```java
@WebServlet("/")
public class HomeServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res) 
            throws ServletException, IOException {
        // ...
    }
}
```

### 3.2 Database Connection

**Node.js (mysql2):**
```javascript
const mysql = require('mysql2');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'shopdb'
});
module.exports = pool.promise();
```

**Java (JDBC):**
```java
public class DBConnection {
    private static final String URL = "jdbc:mysql://localhost:3306/shopdb";
    private static final String USER = "root";
    private static final String PASSWORD = "123456";
    
    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}
```

### 3.3 Query Database

**Node.js:**
```javascript
const [rows] = await db.query('SELECT * FROM products');
res.render('products', { products: rows });
```

**Java Servlet:**
```java
List<Product> products = productDAO.getAll();
request.setAttribute("products", products);
request.getRequestDispatcher("/products.jsp").forward(request, response);
```

### 3.4 Template Rendering

**EJS:**
```ejs
<% products.forEach(p => { %>
  <tr>
    <td><%= p.name %></td>
    <td><%= p.price %></td>
  </tr>
<% }) %>
```

**JSP:**
```jsp
<c:forEach var="p" items="${products}">
  <tr>
    <td><c:out value="${p.name}"/></td>
    <td><c:out value="${p.price}"/></td>
  </tr>
</c:forEach>
```

## 4. Ưu và nhược điểm

### Node.js + Express + EJS

**Ưu điểm:**
- ✅ JavaScript end-to-end (frontend + backend)
- ✅ Non-blocking I/O, hiệu suất cao cho I/O operations
- ✅ Ecosystem npm phong phú
- ✅ Code ngắn gọn, dễ học
- ✅ Hot reload, development nhanh
- ✅ JSON native support
- ✅ Phù hợp cho real-time apps (WebSocket)

**Nhược điểm:**
- ❌ Single-threaded, không tốt cho CPU-intensive tasks
- ❌ Callback hell (nếu không dùng async/await)
- ❌ Type safety kém (cần TypeScript)
- ❌ Memory management kém hơn Java

### Java Servlet + JSP

**Ưu điểm:**
- ✅ Type-safe, compile-time checking
- ✅ Multi-threaded, tốt cho CPU-intensive tasks
- ✅ Mature ecosystem, enterprise-ready
- ✅ Strong typing, ít lỗi runtime
- ✅ JVM optimization tốt
- ✅ Phù hợp cho large-scale enterprise apps

**Nhược điểm:**
- ❌ Code dài dòng, boilerplate nhiều
- ❌ Learning curve cao
- ❌ Cần servlet container (Tomcat, etc.)
- ❌ Development chậm hơn (compile, deploy)
- ❌ Blocking I/O mặc định

## 5. Khi nào dùng gì?

### Chọn Node.js + Express khi:
- 🎯 Real-time applications (chat, gaming)
- 🎯 RESTful APIs, microservices
- 🎯 I/O-intensive applications
- 🎯 Full-stack JavaScript team
- 🎯 Prototyping nhanh
- 🎯 Single Page Applications (SPA)

### Chọn Java Servlet + JSP khi:
- 🎯 Enterprise applications lớn
- 🎯 CPU-intensive processing
- 🎯 Cần type safety cao
- 🎯 Team có kinh nghiệm Java
- 🎯 Legacy systems integration
- 🎯 Banking, financial systems

## 6. Performance Benchmark

### I/O Operations (Database queries)
- **Node.js**: ⭐⭐⭐⭐⭐ (Non-blocking, concurrent)
- **Java Servlet**: ⭐⭐⭐ (Blocking, thread overhead)

### CPU-intensive Tasks
- **Node.js**: ⭐⭐ (Single-threaded bottleneck)
- **Java Servlet**: ⭐⭐⭐⭐⭐ (Multi-threaded, JVM optimization)

### Memory Usage
- **Node.js**: ⭐⭐⭐ (V8 engine efficient)
- **Java Servlet**: ⭐⭐⭐⭐ (JVM optimization tốt hơn)

## 7. Kết luận

**Node.js + Express + EJS** phù hợp cho:
- Projects nhỏ đến trung bình
- Real-time applications
- API development
- Full-stack JavaScript developers

**Java Servlet + JSP** phù hợp cho:
- Enterprise applications
- Large-scale systems
- CPU-intensive applications
- Teams có kinh nghiệm Java

**Lựa chọn phụ thuộc vào:**
- Team expertise
- Project requirements
- Performance needs
- Scalability requirements

