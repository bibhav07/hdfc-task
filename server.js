//global configurations
require("dotenv").config();
require("express-async-errors");

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");

const routes = require("./routes");
const connectDB = require("./db/connect");

//import middlewares
const errorHandler = require("./middlewares/errorHandler");
const notFoundMiddlewar = require("./middlewares/not-found");

const db = mongoose.connection;
//db on error response
db.on("error", console.error.bind(console, "MongoDB connection error"));

const app = express();

//middlewares
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

//base route
app.use("/api/v1", routes);

//not-found route handler
app.use(notFoundMiddlewar);


//custom error handeling
app.use(errorHandler);

async function start() {
  const PORT = process.env.PORT || 5000;

  try {
    await connectDB(process.env.MONGODB_URI);

    app.listen(PORT, () => {
      console.log(`app running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
