import { ValidationError } from "express-validator";

export const validatorErrorFormater = (initialErrorFormat: ValidationError[]) => {
    return initialErrorFormat.map((errorObj) => {
        return errorObj.msg;
    });
};
