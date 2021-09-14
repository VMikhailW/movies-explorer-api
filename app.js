const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const { errors } = require("celebrate");
const limiter = require("./middlewares/limiter");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const errorsMiddlewares = require("./middlewares/errors");
const allRouters = require("./routes/index");
const CONFIG_DEV = require("./utils/configDev");

const { DB_CONNECTION_STRING, NODE_ENV } = process.env;
const { PORT = 3000 } = process.env;
const allowedCors = [
  "localhost:3000",
];
const app = express();
app.use(helmet());
app.use(express.json());
mongoose.connect(NODE_ENV === "production" ? DB_CONNECTION_STRING : CONFIG_DEV.DB_CONNECTION_STRING_DEV, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
app.use(requestLogger);
app.use(limiter);
app.use((req, res, next) => {
  const { origin } = req.headers;

  const { methodHttp } = req;
  const requestHeaders = req.headers["access-control-request-headers"];
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
  if (allowedCors.includes(origin)) {

    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
  }
  if (methodHttp === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
    res.header("Access-Control-Allow-Headers", requestHeaders);
    return res.end();
  }
  return next();
});
app.use("/", allRouters);
app.use(errorLogger);
app.use(errors());
app.use(errorsMiddlewares);
app.listen(PORT, () => { });
