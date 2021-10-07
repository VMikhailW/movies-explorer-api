const router = require("express").Router();

const {
  getMovies, createMovie, deleteMovie,
} = require("../controllers/movies");

const {
  validateCreateMovie,
  validateDeleteMovie,
} = require("../middlewares/requestValidation");

router.get("/api/movies", getMovies);
router.post("/api/movies", validateCreateMovie, createMovie);
router.delete("/api/movies/:movieId", validateDeleteMovie, deleteMovie);
module.exports = router;
