const mongoose = require("mongoose");

const Scheme = mongoose.Schema;

const categorySchema = new Scheme({
  name: { type: String, required: true },
});
module.exports = mongoose.model("category", categorySchema);
