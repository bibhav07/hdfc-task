const router = require("express").Router();
const movieRoutes = require("./movieRoutes");
const cinemaRoutes = require("./cinemaRoutes");
const showtimeRoutes = require("./showtimeRoutes");
const authRoutes = require("./authRoutes");


router.use("/movies", movieRoutes);
router.use("/cinemas", cinemaRoutes);

router.use("/showtimes", showtimeRoutes);
router.use("/auth", authRoutes);

module.exports = router;
