const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Account } = require("../models/user");
const { JWT_SECRET } = require("../config");

const userSchema = z.object({
  userName: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
});

const loginSchema = z.object({
  userName: z.string().email(),
  password: z.string(),
});

const optionalUserSchema = z.object({
  password: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

const signUp = async (req, res) => {
  const parseResult = userSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ message: "Invalid input data" });
  }

  const { userName, firstName, lastName, password } = parseResult.data;

  const existingUser = await User.findOne({ userName });
  if (existingUser) {
    return res.status(400).json({ message: "Email already taken" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    userName,
    firstName,
    lastName,
    password: hashedPassword,
  });

  await newUser.save();

  const account = new Account({
    userId: newUser._id,
    balance: 1 + Math.random() * 1000,
  });

  await account.save();

  const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return res.status(201).json({ message: "User created successfully", token });
};

const signIn = async (req, res) => {
  const parseResult = loginSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ message: "Invalid login data" });
  }

  const { userName, password } = parseResult.data;

  const existingUser = await User.findOne({ userName });
  if (!existingUser) {
    return res.status(400).json({ message: "No user - Please SignUp..." });
  }
  if (
    !existingUser ||
    !(await bcrypt.compare(password, existingUser.password))
  ) {
    return res.status(400).json({ message: "Incorrect email or password" });
  }

  const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return res.status(200).json({ message: "Login successful", token });
};

const updateUser = async (req, res) => {
  const parseResult = optionalUserSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ message: "Invalid input for update" });
  }

  await User.updateOne({ _id: req.userId }, parseResult.data);
  return res.status(200).json({ message: "Updated successfully" });
};

const filterUser = async (req, res) => {
  const { filter } = req.query;
  const users = await User.find({
    $or: [
      { firstName: { $regex: filter, $options: "i" } },
      { lastName: { $regex: filter, $options: "i" } },
    ],
  });

  const filteredUsers = users.filter(
    (user) => user._id.toString() !== req.userId
  );
  res.json({
    users: filteredUsers.map((user) => ({
      username: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
};

const getAllUsers = async (req, res) => {
  const allUsers = await User.find({});
  const filteredUsers = allUsers.filter(
    (user) => user._id.toString() !== req.userId
  );

  res.json(filteredUsers);
};

const loggedInUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching logged-in user:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  signUp,
  signIn,
  updateUser,
  filterUser,
  getAllUsers,
  loggedInUser,
};
