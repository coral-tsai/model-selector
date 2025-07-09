const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://coraltsai:i3V0yjag7yLaDGeY@cluster0.1i7xinm.mongodb.net/model_selector?retryWrites=true&w=majority"
)
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    password: String,
  })
);

const Swipe = mongoose.model(
  "Swipe",
  new mongoose.Schema({
    userId: String,
    photoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Photo' },
    direction: String,
    timestamp: { type: Date, default: Date.now },
  })
);

const Photo = mongoose.model(
  "Photo",
  new mongoose.Schema({
    url: String,
    country: String,
    age: Number,
    hairColor: String,
  })
);

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    res.json({ success: true, userId: user._id });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

app.get("/api/photos", async (req, res) => {
  const { userId } = req.query;
  const swipedIds = await Swipe.find({ userId }).distinct("photoId");
  const photos = await Photo.find({ _id: { $nin: swipedIds } });
  res.json(photos);
});

app.post("/api/swipes", async (req, res) => {
  const { userId, photoId, direction } = req.body;
  await Swipe.create({ userId, photoId, direction });
  res.json({ success: true });
});

app.get("/api/swipes", async (req, res) => {
  try {
    const swipes = await Swipe.find().populate('photoId');
    res.json(swipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/photos", async (req, res) => {
  const photos = await mongoose.connection.db
    .collection("photos")
    .find()
    .toArray();
  res.json(photos);
});

app.listen(5001, () =>
  console.log("✅ Backend running on http://localhost:5001")
);
