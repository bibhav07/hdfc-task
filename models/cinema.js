// models/cinema.js
const mongoose = require("mongoose");

const cinemaSchema = new mongoose.Schema({
  name: String,
  city: String,
});

module.exports = mongoose.model("Cinema", cinemaSchema);
