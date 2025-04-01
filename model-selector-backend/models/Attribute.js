const mongoose = require("mongoose");

const attributeSchema = new mongoose.Schema({
  name: String,
  values: [String],
});

module.exports = mongoose.model("Attribute", attributeSchema);
