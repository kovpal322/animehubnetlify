const express = require("express");
const route = express.Router();

const {
  createHomeAnimes,
  getAnimes,
  getCategories,
  getFavoriteAnimes,
  deleteAnime,
  addAnime,
} = require("../controllers/animeControllers");
const { requireAuth } = require("../middleware/requireAuth");

route.get("/get/categories", getCategories);
route.post("/add/anime", createHomeAnimes);
route.get("/get/animes", getAnimes);
route.get("/get/favanimes/:id", getFavoriteAnimes);
route.delete("/delete/anime/:id", requireAuth, deleteAnime);
route.post("/add/anime", addAnime);
module.exports = route;
