const router = require("express").Router();
const {
  updateUser, getInfoAboutMe,
} = require("../controllers/users");

const {
  validateId,
  validateUpdateCurrentUser,
} = require("../middlewares/requestValidation");

router.get("/api/users/me", validateId, getInfoAboutMe);
router.patch("/api/users/me", validateUpdateCurrentUser, updateUser);
module.exports = router;
