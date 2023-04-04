const Cinema = require("../models/cinema");
const { StatusCodes }  = require("http-status-codes");

const getAllCinemas = async (req, res) => {
    const cinemas = await Cinema.find({});
    return res.status(StatusCodes.OK).json({cinemas});
  
};


module.exports  = {getAllCinemas};
