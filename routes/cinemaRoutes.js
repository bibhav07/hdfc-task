const router = require("express").Router();
const cinemaController = require("../controllers/cinemaController");

router.get("/", cinemaController.getAllCinemas);

module.exports = router;
