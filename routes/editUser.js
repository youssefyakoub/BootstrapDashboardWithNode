const express = require("express");
const router = express.Router();

const User = require("../models/userSchema");


const userControllers = require("../controllers/userControllers")

// get data
router.get("/:id", userControllers.user_edit_getUserData);

// delete request
router.delete("/:id", userControllers.user_edit_deleteUser);


// update request
router.put("/:id", userControllers.user_edit_updateUserData);


module.exports = router;
