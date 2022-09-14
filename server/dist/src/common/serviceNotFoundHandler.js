import createError from "http-errors";
const serviceNotFoundHandler = (req, res, next) => {
    next(createError(404, "service not found"));
};
export default serviceNotFoundHandler;
