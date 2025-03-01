const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
var moment = require("moment");

const userControllers = require("../controllers/userControllers")

router.get("", userControllers.user_add_openAddPage);

router.post("", userControllers.user_add_createUser);


module.exports = router;
