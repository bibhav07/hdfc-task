const Showtime = require("../models/showtime");
const Cinema = require("../models/cinema");
const Movie = require("../models/movie");
const { StatusCodes } = require("http-status-codes");
const CustomErrorHandler = require("../services/customErrorHandler");

/**
 * 
 * @returns json, returns details of partiular show with movie and cinema
 */
const getShowTimeById = async (req, res, next) => {
  
    const { showId } = req.params;

    const showtimes = await Showtime.findOne({ _id: showId })
      .populate({
        path: "movieId",
        select: "-__v",
      })
      .populate({
        path: "cinemaId",
        select: "-__v",
      });

    if (!showtimes) {
      return next(CustomErrorHandler.notFound(`no show found by id ${showId}`));
    }

    res.status(StatusCodes.OK).json({ show: showtimes });
 
};


/**
 * @returns json, returns all shows with movie and cinema
 */
const getAllShowTime = async (req, res) => {

  //using "populate" in to retrieve referenced documents from movie and cinema collections
  //also, a single show always belongs to one movie and one cinema

  const allShows = await Showtime.find({})
    .populate({
      path: "movieId",
      select: "-__v",
    })
    .populate({
      path: "cinemaId",
      select: "-__v",
    });

  res.status(StatusCodes.OK).json({ total : allShows.length,  allShows });
};


/**
 * 
 * @param {cityName} req
 * @returns json, returns all movies with show times and cinema in the particular city
 */
const getAllMoviesByCity = async (req, res) => {

  const { cityName } = req.params;

  //fetch all cinemas from this city
  const cinemas = await Cinema.find({ city: cityName });

  //get all ids of the cinemas from this city
  const cinemaIds = cinemas.map((cinema) => cinema._id);

  // Find all showtimes and movies that match the cinema IDs 
  const showInCity = await Showtime.find({ cinemaId: { $in: cinemaIds } })
                    .populate({ path: "movieId", select: "-__v" })
                    .populate({ path: "cinemaId", select: "-__v" });

  return res.status(StatusCodes.OK).json({
      city: cityName,
      totalShows: showInCity.length,
      shows: showInCity,
    });
  

 
};


/**
 * 
 * @param {movieName} req
 * @returns json, returns all cinemas with show times where particular movie will be played
 */
const getAllCinemasByMovie = async (req, res, next) => {

  const { movieName   }  = req.params;

  //const {movieName}  = req.query;

  // fetcing this particular movie by title
  const movie = await Movie.findOne({ title: movieName });

  //if no movie found, there will be  no showtimes or city so returning an error
  if (!movie) {
    return next(  CustomErrorHandler.notFound(`no movie found by title : ${movieName}`)  )
  }

  //fetching all the shows
  const allShowTimes = await Showtime.find({})
    .populate({ path: "movieId", select: "-__v" })
    .populate({ path: "cinemaId", select: "-__v" });

  //now filtering out all the shows where this movie will be played
  const movieShowTime = allShowTimes.filter((show) =>
    show.movieId.equals(movie._id)
  );

  //returning the shows of this movie, along with show times and city
  return res.status(StatusCodes.OK).json({ movieShowTime });
};


/**
 * @body {showtimeId, seatNumber} req
 * @param {cityName} req
 * @returns json, returns message on successfully booking seat or seat is already booked
 */
const bookTicket = async (req, res, next) => {

  // Get the username from the authenticated user middleware
    const username = req.user.username;

    // Get the showtime ID and seat number from the request body
    const { showtimeId, seatNumber } = req.body;

    if (!showtimeId || !seatNumber) {
      return next(
        CustomErrorHandler.badRequest("showtimeId and seatNumber required!")
      );
    }

    //fetching the show
    const showtime = await Showtime.findById(showtimeId);

    
    if (!showtime) {
      return next(
        CustomErrorHandler.notFound(`no show found by id ${showtimeId}`)
      );
    }

    //check if the 'seatNumber' is already booked
    if (showtime.bookedSeats.includes(seatNumber)) {
       return next(
         CustomErrorHandler.badRequest(`Seat '${seatNumber}' already booked`)
       );
    }

    // updating the show document to mark the seat as booked, by saving the seatNumber
    showtime.bookedSeats.push(seatNumber);
    await showtime.save();

    // return a success message
    return res.status(StatusCodes.OK).json({ message: `${username}, ticket booked successfully` });

  
};




module.exports = {
  getShowTimeById,
  bookTicket,
  getAllShowTime,
  getAllMoviesByCity,
  getAllCinemasByMovie,
};
