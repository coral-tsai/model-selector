const express = require("express");
const router = express.Router();
const User = require("../models/User");

// 假資料測試用：你也可以直接在 MongoDB Compass 加資料
// { username: "testuser", password: "1234" }

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ 
        success: false,
        message: "帳號或密碼錯誤" 
      });
    }
    res.json({ 
      success: true,
      message: "登入成功", 
      userId: user.username 
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: err.message 
    });
  }
});

module.exports = router;
