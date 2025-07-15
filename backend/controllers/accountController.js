const { Account } = require("../models/user");

// Get current user balance
const getBalance = async (req, res) => {
  try {
    const account = await Account.findOne({ userId: req.userId });
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.status(200).json({ balance: account.balance });
  } catch (error) {
    console.error("Balance fetch error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Transfer money between users (no transaction version)
const transferMoney = async (req, res) => {
  try {
    const { transferTo, amount } = req.body;

    if (!transferTo || !amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid transfer details" });
    }

    const transferAmount = Number(amount);

    const sender = await Account.findOne({ userId: req.userId });
    const receiver = await Account.findOne({ userId: transferTo });

    if (!sender) {
      return res.status(404).json({ message: "Sender account not found" });
    }

    if (!receiver) {
      return res.status(404).json({ message: "Recipient account not found" });
    }

    if (sender.balance < transferAmount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    sender.balance -= transferAmount;
    receiver.balance += transferAmount;

    await sender.save();
    await receiver.save();

    res.status(200).json({ message: "Transfer successful" });
  } catch (error) {
    console.error("Transfer error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getBalance,
  transferMoney,
};
