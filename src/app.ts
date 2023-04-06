import express, { Application, json } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProduct,
  updateProduct,
} from "./logic";
import { checkId, checkName, checkNameUpdate } from "./middlewares";

const app: Application = express();
app.use(json());

app.post("/products", checkName, createProduct);
app.get("/products", listProduct);
app.get("/products/:id", checkId, getProductById);
app.patch("/products/:id", checkNameUpdate, checkId, updateProduct);
app.delete("/products/:id", checkId, deleteProduct);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
