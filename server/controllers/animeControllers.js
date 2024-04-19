const animeSchema = require("../models/animemodel");
const User = require("../models/usermodel");
const categorySchema = require("../models/categoryModel");
const mongoose = require("mongoose");
const createHomeAnimes = async (req, res) => {
  try {
    const anime = await animeSchema.create({ ...req.body });
    res.status(200).json(anime);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

const createCategory = async (req, res) => {
  try {
    const studio = await categorySchema.create({ ...req.body });
    res.json(studio);
  } catch (err) {
    res.json(err);
  }
};

const getAnimes = async (req, res) => {
  const { q } = req.query;
  try {
    const animes = await animeSchema.find();

    res.json(
      q.length > 2
        ? animes.filter((item) =>
            item.title.toLowerCase().includes(q.toLowerCase())
          )
        : animes
    );
  } catch (err) {
    res.json(err);
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await categorySchema.find();

    res.json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
};
const getFavoriteAnimes = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: "animes",
          localField: "favoriteAnimes",
          foreignField: "_id",
          as: "favoriteAnimes",
        },
      },
    ]);
    res.json(user[0].favoriteAnimes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
};

const deleteAnime = async (req, res) => {
  const { id } = req.params;
  try {
    await animeSchema.findByIdAndDelete(id);

    res.json("anime deleted ");
  } catch (err) {
    res.status(500).json(err);
  }
};

const addAnime = async (req, res) => {
  const { uploadAnimeObj } = req.body;
  try {
    const anime = await animeSchema.create(uploadAnimeObj);

    res.json(anime);
  } catch (err) {
    res.status(500).json({ error: "failed to upload anime" });
  }
};

module.exports = {
  createHomeAnimes,
  createCategory,
  getAnimes,
  getCategories,
  getFavoriteAnimes,
  deleteAnime,
  addAnime,
};
