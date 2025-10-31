// =========================
// ✅ Import Dependencies
// =========================
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");

// =========================
// ✅ App Config
// =========================
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // your React dev server
    credentials: true,
  })
);

const PORT = 3000;
const MONGO_URL = "mongodb://127.0.0.1:27017/newdb";

// =========================
// ✅ MongoDB Connection
// =========================
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

// =========================
// ✅ SCHEMAS & MODELS
// =========================

// --- User Signup Schema ---
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  personalID: { type: String, required: true, unique: true },
  age: String,
  rank: String,
  department: String,
  unit: String,
  roll: String,
  dob: String,
  password: { type: String }, // hashed password
  security_question_1: String,
  security_answer_1: String,
  security_question_2: String,
  security_answer_2: String,
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("users", userSchema);

// =========================
// ✅ ROUTES
// =========================

// Test Route
app.get("/", (req, res) => {
  res.send("✅ Backend server is running successfully!");
});

// ----------------------------------------------------
// 🧩 SIGNUP ROUTE — Create a new user record
// ----------------------------------------------------
app.post("/signup", async (req, res) => {
  try {
    const {
      name,
      personalID,
      age,
      rank,
      department,
      unit,
      roll,
      dob,
      password,
      security_question_1,
      security_answer_1,
      security_question_2,
      security_answer_2,
    } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ personalID });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists with this ID." });
    }

    // Hash password and answers
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedAnswer1 = await bcrypt.hash(security_answer_1, 10);
    const hashedAnswer2 = await bcrypt.hash(security_answer_2, 10);

    // Create new user
    const newUser = new User({
      name,
      personalID,
      age,
      rank,
      department,
      unit,
      roll,
      dob,
      password: hashedPassword,
      security_question_1,
      security_answer_1: hashedAnswer1,
      security_question_2,
      security_answer_2: hashedAnswer2,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Signup successful! You can now log in.",
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error during signup." });
  }
});

// ----------------------------------------------------
// 🔐 LOGIN ROUTE — Verify user credentials
// ----------------------------------------------------
app.post("/login", async (req, res) => {
  try {
    const { personalID, password } = req.body;

    // Find user by personalID
    const user = await User.findOne({ personalID });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Personal ID not found. Please sign up or contact admin.",
      });
    }

    // Check if user has a password set
    if (!user.password) {
      return res.status(403).json({
        success: false,
        message:
          "Password not assigned yet. Please contact your department admin.",
      });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password. Please try again." });
    }

    // ✅ Successful login
    return res.status(200).json({
      success: true,
      message: "Login successful!",
      user: {
        name: user.name,
        department: user.department,
        rank: user.rank,
        unit: user.unit,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error during login. Please try again." });
  }
});


// ----------------------------------------------------
// ⚙️ ADMIN PASSWORD ASSIGN ROUTE (optional)
// ----------------------------------------------------
app.post("/set-password", async (req, res) => {
  try {
    const { personalID, newPassword } = req.body;

    const user = await User.findOne({ personalID });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found." });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password assigned/updated successfully.",
    });
  } catch (error) {
    console.error("Set Password Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error updating password." });
  }
});



// =========================
// ✅ ASSET SCHEMA & MODEL
// =========================
const assetSchema = new mongoose.Schema({
  type: { type: String, required: true },           // hardware / network / misc
  deviceType: { type: String, required: true },     // printer / computer / switch etc.
  details: {
    hardwareDetails: {
      computerDetails: {
        serialNum: String,
        ipAddress: String,
      },
    },
  },
  createdAt: { type: Date, default: Date.now },
});

const Asset = mongoose.model("assets", assetSchema);

// =========================
// ✅ ASSET REGISTRATION ROUTE
// =========================
app.post("/assets", async (req, res) => {
  try {
    const { type, deviceType, details } = req.body;

    if (!type || !deviceType) {
      return res.status(400).json({
        success: false,
        message: "Type and device type are required.",
      });
    }

    const newAsset = new Asset({
      type,
      deviceType,
      details,
    });

    await newAsset.save();

    res.status(201).json({
      success: true,
      message: "Asset registered successfully!",
      asset: newAsset,
    });
  } catch (error) {
    console.error("❌ Asset Registration Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while saving asset.",
    });
  }
});


// ----------------------------------------------------
// 🔐 PASSWORD RECOVERY ROUTE — via Security Questions
// ----------------------------------------------------
app.post("/recover-password", async (req, res) => {
  try {
    const { personalID, answer1, answer2, newPassword } = req.body;

    // Validate input
    if (!personalID || !answer1 || !answer2 || !newPassword) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    // Find user
    const user = await User.findOne({ personalID });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found with this ID." });
    }

    // Check if security answers exist
    if (!user.security_answer_1 || !user.security_answer_2) {
      return res.status(400).json({
        success: false,
        message: "Security questions not set for this user.",
      });
    }

    // Compare answers (hashed)
    const isAnswer1Match = await bcrypt.compare(answer1, user.security_answer_1);
    const isAnswer2Match = await bcrypt.compare(answer2, user.security_answer_2);

    if (!isAnswer1Match || !isAnswer2Match) {
      return res.status(401).json({
        success: false,
        message: "Incorrect security answers. Please try again.",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password successfully reset. You can now log in with the new password.",
    });
  } catch (error) {
    console.error("Recover Password Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while resetting password.",
    });
  }
});


app.post("/assets", async (req, res) => {
  try {
    console.log("📥 /assets hit with:", req.body);

    // ... your DB logic here ...
    return res.json({ success: true, asset: req.body });
  } catch (err) {
    console.error("❌ /assets error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});



// =========================
// ✅ SERVER START
// =========================
app.listen(PORT, () =>
  console.log(`🚀 Server running at: http://localhost:${PORT}`)
);
