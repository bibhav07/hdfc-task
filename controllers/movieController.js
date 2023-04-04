const Movie = require("../models/movie");
const { StatusCodes }  = require("http-status-codes");


const getAllMovies = async (req, res) => {

  const movies = await Movie.find({});
  return  res.status(StatusCodes.OK).json({movies});
};


module.exports = {getAllMovies};