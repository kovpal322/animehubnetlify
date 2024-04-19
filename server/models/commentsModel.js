const mongoose = require("mongoose");

const Scheme = mongoose.Schema;

const commentsSchema = new Scheme(
  {
    userId: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
    animeId: { type: mongoose.Types.ObjectId, required: true, ref: "anime" },
    text: { type: String, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("comment", commentsSchema);
