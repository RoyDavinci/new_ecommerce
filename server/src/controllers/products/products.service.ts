import { uploadArray } from "../../common/multer";
import { Router } from "express";
import { authenticateJWT } from "../../common/authenticate";

import * as controller from "./product.controllers";

const productRouter = Router();

productRouter.post("/add-product", authenticateJWT, uploadArray, controller.createProduct);
productRouter.get("/", controller.getProducts);
productRouter.delete("/:id", authenticateJWT, controller.deleteProducts);
productRouter.patch("/:id", authenticateJWT, controller.updateProduct);
productRouter.get("/:id", controller.getSingleProduct);
productRouter.get("/category/:categoryId", controller.getProductByCategory);

export { productRouter };
