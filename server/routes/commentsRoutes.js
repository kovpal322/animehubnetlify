const express = require("express");
const {
  getComments,
  postComment,
} = require("../controllers/commentController");
const { requireAuth } = require("../middleware/requireAuth");
const commentsModel = require("../models/commentsModel");
const route = express.Router();

route.get("/get/comments/:animeId/:pages", getComments);
route.delete("/delete/comment", async (req, res) => {
  try {
    await commentsModel.deleteMany();
    res.json("success");
  } catch (error) {
    res.json(err);
  }
});
route.post("/post/comment", postComment);
module.exports = route;
