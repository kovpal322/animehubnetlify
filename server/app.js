const express = require("express");
const app = express();

const cors = require("cors");
const animeRoutes = require("./routes/animeRoutes");
require("dotenv").config();
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const commentRoutes = require("./routes/commentsRoutes");
app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(animeRoutes);
app.use(commentRoutes);
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `server is listening to port ${process.env.PORT} and connected to db`
      );
    });
  })
  .catch((err) => console.log(err));
