const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");

const app = express();

// Set EJS as the view engine
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

// Import routes
const allRoutes = require("./routes/allRoutes");
const addUser = require("./routes/addUser");
const editUser = require("./routes/editUser");

// Use routes
app.use(allRoutes);
app.use("/user/add.html", addUser);
app.use("/edit", editUser);

// Handle 404 errors
app.use((req, res) => {
  res.status(404).render("404");
});

// Connect to MongoDB
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Export the app instead of using `app.listen()` (required for Vercel)
module.exports = app;
