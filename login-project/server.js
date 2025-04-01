const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// mongoose.connect("mongodb://localhost:27017/model-selector");
mongoose.connect(
  "mongodb+srv://coraltsai:i3V0yjag7yLaDGeY@cluster0.1i7xinm.mongodb.net/model_selector?retryWrites=true&w=majority"
);

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    password: String,
  })
);

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

app.listen(5001, () => console.log("Server on http://localhost:5001"));
