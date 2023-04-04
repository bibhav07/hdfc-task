const router = require("express").Router();
const movieController = require("../controllers/movieController");

router.get("/", movieController.getAllMovies);

module.exports = router;
