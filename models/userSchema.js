const mongoose = require("mongoose");
const Schema = mongoose.Schema;


 
// define the Schema (the structure of the article)
const userSchema = new Schema({
  userName : String,
  lastName : String,
  email : String,
  telephone : String,
  age : Number,
  country : String,
  gender : String,

},{timestamps:true});

// Create a model based on that schema
const User = mongoose.model("User", userSchema);
 


// export the model
module.exports = User;