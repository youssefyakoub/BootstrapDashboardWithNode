const express = require("express");
const router = express.Router();

const User = require("../models/userSchema");
var moment = require("moment");

const userControllers = require("../controllers/userControllers")

// GET REQUEST
router.get("/" , userControllers.user_index_getData);

router.get("/user/view.html", userControllers.user_view_Data);

router.get("/view/:id", userControllers.user_view_UserData);

// POST REQUEST

router.post("/search", userControllers.user_search_userName);

module.exports = router;
