const User = require("../models/userSchema");
var moment = require("moment");



const user_index_getData =  (req, res) => {
  User.find()
    .then((result) => {
      res.render("index", { arr: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
}



const user_view_Data = (req, res) => {
  res.render("user/view", {});
}


const user_view_UserData = (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/view", { info: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
}


const user_search_userName = (req, res) => {
  const searchText = req.body.searchText.trim();
  User.find({ $or: [{ userName: searchText }, { lastName: searchText }] })
    .then((result) => {
      res.render("user/search", { info: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
}



const user_edit_getUserData = (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/edit", { info: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
}


const user_edit_deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
}


const user_edit_updateUserData = (req, res) => {
  User.updateOne({ _id: req.params.id }, req.body)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
}


const user_add_openAddPage = (req, res) => {
  res.render("user/add", {});
}


const user_add_createUser = (req, res) => {
  User.create(req.body)
    .then(() => {
      res.redirect("/user/add.html");
    })
    .catch((err) => {
      console.log(err);
    });
}


module.exports = {user_index_getData , user_view_Data , user_view_UserData,user_search_userName,user_edit_getUserData,user_edit_deleteUser,user_edit_updateUserData,user_edit_updateUserData,user_add_openAddPage,user_add_createUser}