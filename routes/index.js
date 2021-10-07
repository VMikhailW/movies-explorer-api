const router = require("express").Router();
const { login, createUser } = require("../controllers/users");
const usersRouter = require("./users");
const moviesRouter = require("./movies");
const errorsRouter = require("./errors");
const auth = require("../middlewares/auth");

const {
  validateLogin,
  validateSignup,
} = require("../middlewares/requestValidation");

router.post("/api/signin", validateLogin, login);
router.post("/api/signup", validateSignup, createUser);
router.use(auth);
router.use("/", usersRouter);
router.use("/", moviesRouter);
router.use("*", errorsRouter);
module.exports = router;
