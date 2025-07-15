const express = require("express");
const router = express.Router();
const {
  signUp,
  signIn,
  updateUser,
  filterUser,
  getAllUsers,
  loggedInUser
} = require("../controllers/userController");

const authMiddleware = require("../middleware");

// Public Routes
router.post("/signup", signUp);     // POST /api/v1/user/signup
router.post("/signin", signIn);     // POST /api/v1/user/signin

// Auth-Protected Routes
router.put("/update", authMiddleware, updateUser);
router.get("/bulk", authMiddleware, filterUser);
router.get("/get-users", authMiddleware, getAllUsers);
router.get("/get-user", authMiddleware, loggedInUser);

module.exports = router;
