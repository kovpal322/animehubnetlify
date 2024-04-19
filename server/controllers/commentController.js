const commentsModel = require("../models/commentsModel");
const mongoose = require("mongoose");
const usermodel = require("../models/usermodel");
const getComments = async (req, res) => {
  const { animeId, pages } = req.params;
  console.log(animeId);
  try {
    const comments = await commentsModel.aggregate([
      {
        $match: { animeId: new mongoose.Types.ObjectId(animeId) },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userInformation",
        },
      },
    ]);
    if (pages * 5 < comments.length) {
      res.status(200).json({
        comments: comments.reverse().splice(0, pages * 5),
        showMore: true,
      });
    } else {
      res.status(200).json({
        comments: comments.reverse().splice(0, pages * 5),
        showMore: false,
      });
    }
  } catch (error) {
    res.json(error);
  }
};

const postComment = async (req, res) => {
  const { userId, animeId, text } = req.body;
  try {
    const newPost = await commentsModel.create({ userId, animeId, text });
    const user = await usermodel.findById(userId);
    const doc = { ...newPost._doc, userInformation: [user] };
    res.json(doc);
  } catch (err) {
    res.json(err);
  }
};
module.exports = { getComments, postComment };
