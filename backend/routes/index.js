const express = require("express");
const userRouter = require("./user");
const accountRouter = require("./account");

const router = express.Router();

router.use("/user", userRouter);     // /api/v1/user/...
router.use("/account", accountRouter); // /api/v1/account/...

module.exports = router;
