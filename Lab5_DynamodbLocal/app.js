import "dotenv/config";
import express from "express";
import { ensureTable } from "./aws/dynamodb.js";
import productRoutes from "./routes/product.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use("/", productRoutes);

ensureTable()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running on port", PORT);
    });
  })
  .catch((err) => {
    console.error("DynamoDB init failed:", err);
    process.exit(1);
  });
