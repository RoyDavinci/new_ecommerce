import { Router } from "express";
import { authenticateJWT } from "../../common/authenticate";
import * as controller from "./product.controllers";
import multer from "multer";
const fileUpload = multer();

const productRouter = Router();

productRouter.post("/add-product", authenticateJWT, fileUpload.single("product"), controller.createProduct);
productRouter.get("/", controller.getProducts);
productRouter.delete("/:id", authenticateJWT, controller.deleteProducts);
productRouter.patch("/:id", authenticateJWT, fileUpload.single("product"), controller.updateProduct);
productRouter.get("/:id", controller.getSingleProduct);
productRouter.get("/category/:categoryId", controller.getProductByCategoryId);

export { productRouter };
