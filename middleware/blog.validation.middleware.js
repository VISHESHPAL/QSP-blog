import CustomError from "../utils/CustomError.util.js";

const validateRequest = (schema) => {
  return async (req, res, next) => {

    const { error, value } = schema.validate(req.body);
    // console.log(value);

    if (error) {
      console.log(error);
      let message = error.details[0].message;
      return next(new CustomError(message, 400));
    }

    req.body = value;
    next();
  };
};

export default validateRequest;
