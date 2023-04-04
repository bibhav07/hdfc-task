const router = require("express").Router();
const showtimeController = require("../controllers/showtimeController");
const authenticateUser = require("../middlewares/authenticate");

router.get("/shows", showtimeController.getAllShowTime);

router.get("/city/:cityName", showtimeController.getAllMoviesByCity);

router.get("/movie/:movieName", showtimeController.getAllCinemasByMovie);

router.get("/show/:showId", showtimeController.getShowTimeById);

//using 'authenticateUser' middleware to check if user is authenticated!
router.post("/bookTicket", [authenticateUser],showtimeController.bookTicket);

module.exports = router;
