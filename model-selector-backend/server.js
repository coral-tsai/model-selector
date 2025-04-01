// // server.js
// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error(err));

// // Routes
// const photoRoutes = require("./routes/photos");
// app.use("/photos", photoRoutes);

// const PORT = process.env.PORT || 5003;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// require("dotenv").config();

// const swipeRoutes = require("./routes/swipes");
// app.use("/swipes", swipeRoutes);

// const authRoutes = require("./routes/auth");
// app.use("/auth", authRoutes);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

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

const Swipe = mongoose.model(
  "Swipe",
  new mongoose.Schema({
    userId: String,
    photoId: String,
    direction: String,
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

// const User = mongoose.model(
//   "User",
//   new mongoose.Schema({
//     username: String,
//     password: String,
//   })
// );

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    res.json({ success: true, userId: user._id });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// ✅ 回傳尚未被此 user 滑過的圖片
app.get("/api/photos", async (req, res) => {
  const { userId } = req.query;
  const swipedIds = await Swipe.find({ userId }).distinct("photoId");
  const photos = await Photo.find({ _id: { $nin: swipedIds } });
  res.json(photos);
});

// ✅ 儲存滑動紀錄
app.post("/api/swipes", async (req, res) => {
  const { userId, photoId, direction } = req.body;
  await Swipe.create({ userId, photoId, direction });
  res.json({ success: true });
});

app.listen(5001, () =>
  console.log("✅ Backend running on http://localhost:5001")
);

app.get("/photos", async (req, res) => {
  const photos = await mongoose.connection.db
    .collection("photos")
    .find()
    .toArray();

  res.json(photos);
});
