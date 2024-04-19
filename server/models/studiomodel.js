const mongoose = require("mongoose");

const Scheme = mongoose.Schema;

const studioSchema = new Scheme({
  name: { type: String, required: true },
});
module.exports = mongoose.model("studio", studioSchema);
