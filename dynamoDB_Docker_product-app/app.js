const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const { ensureProductsTable } = require("./config/initTable");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

const productRoutes = require("./routes/productRoutes");
app.use("/", productRoutes);

async function bootstrap() {
  try {
    await ensureProductsTable();

    app.listen(3000, () => {
      console.log("Server running http://localhost:3000");
    });
  } catch (error) {
    console.error("Failed to start application:", error.message);
    process.exit(1);
  }
}

bootstrap();