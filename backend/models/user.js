const { mongoose, Schema } = require("mongoose");

const userSchema = Schema({
  userName: {
    type: String,
    unique: true,
  },
  firstName: String,
  lastName: String,
  password: String,
});

const accountSchema = Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = { User, Account };
