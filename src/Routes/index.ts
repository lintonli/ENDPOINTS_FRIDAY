import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getPaginatedProducts,
  getProductName,
  getProducts,
} from "../controllers/productController";

const productRouter = Router();
productRouter.post("", addProduct);
productRouter.get("", getProducts);
productRouter.get("/:id", getProductName);
productRouter.get("/products/page", getPaginatedProducts);
productRouter.delete("/:id", deleteProduct);
export default productRouter;
