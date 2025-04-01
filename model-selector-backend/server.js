// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error(err));

// Routes
const photoRoutes = require("./routes/photos");
app.use("/photos", photoRoutes);

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

require("dotenv").config();

const swipeRoutes = require("./routes/swipes");
app.use("/swipes", swipeRoutes);

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);
