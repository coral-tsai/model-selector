const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
  url: String,
  attributes: mongoose.Schema.Types.Mixed, // 可擴充分類
});

module.exports = mongoose.model("Photo", photoSchema);
