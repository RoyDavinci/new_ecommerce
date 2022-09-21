import { Router } from "express";
import { adminRouter, categoryRouter, productRouter, sellerRouter, ssubscriberRouter, subCategoryRouter, userRouter } from "../controllers";

const apiV1Router: Router = Router();

apiV1Router.use("/user", userRouter);
apiV1Router.use("/admin", adminRouter);
apiV1Router.use("/product", productRouter);
apiV1Router.use("/category", categoryRouter);
apiV1Router.use("/subCategory", subCategoryRouter);
apiV1Router.use("/seller", sellerRouter);
apiV1Router.use("/subscriber", ssubscriberRouter);

export default apiV1Router;
