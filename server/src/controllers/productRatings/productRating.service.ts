import { Router } from "express";
import { addRating } from "./productRatings.controllers";

const productRatingRouter = Router();

productRatingRouter.post("/add-rating/:id", addRating);

export { productRatingRouter };
