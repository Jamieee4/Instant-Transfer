const express = require("express");
const router = express.Router();
const {
  getBalance,
  transferMoney
} = require("../controllers/accountController");

const authMiddleware = require("../middleware");

router.get("/balance", authMiddleware, getBalance); // GET /api/v1/account/balance
router.post("/transfer", authMiddleware, transferMoney); // POST /api/v1/account/transfer

module.exports = router;
