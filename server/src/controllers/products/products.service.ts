import { Router } from "express";
import { authenticateJWT, authenticateLocal, authenticateAdminJWT } from "../../common/authenticate";

import * as controller from "./product.controllers";

const productRouter = Router();

productRouter.post("/add-product", authenticateJWT, controller.createProduct);
productRouter.get("/", controller.getProducts);
productRouter.delete("/:id", authenticateJWT, controller.deleteProducts);
productRouter.patch("/:id", authenticateJWT, controller.updateProduct);
productRouter.get("/:id", controller.getSingleProduct);
productRouter.get("/:categoryId", controller.getProductByCategory);

export { productRouter };
