
const error = (err, req, res, next) => {
  // here we copy - >  DEEP COPY

  let error = { ...err };

  if(err.name === 'CastError'){
    error.message = `Invalid ${error.kind} , please provide a valid path ${error.path}`;
    error.statusCode = 400
  }

  error.message = error.message || "Internal Server Error";
  error.statusCode = error.statusCode || 500;


  res.status(error.statusCode).json({
    success : false ,
    message : error.message,
    object  : err,
    stack : error.stack
  })
};

export default error;