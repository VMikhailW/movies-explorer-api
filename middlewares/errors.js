const ANSWER = require("../utils/answers");

const errorsMiddlewares = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
    
      message: statusCode === 500
        ? ANSWER.ServerError
        : message,
    });
  next();
};
module.exports = errorsMiddlewares;
