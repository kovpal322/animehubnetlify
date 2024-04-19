const mongoose = require("mongoose");

const Scheme = mongoose.Schema;

const favoriteAnimesSchema = new Scheme({
  name: { type: String, required: true },
});
module.exports = mongoose.model("favorite_anime", favoriteAnimesSchema);
