const express = require("express");
require("dotenv").config();
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

var methodOverride = require("method-override");
app.use(methodOverride("_method"));

const allRoutes = require("./routes/allRoutes");
const addUser = require("./routes/addUser");
const editUser = require("./routes/editUser");

const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

if (process.env.NODE_ENV !== "production") {
  const livereload = require("livereload");
  const liveReloadServer = livereload.createServer();
  liveReloadServer.watch(path.join(__dirname, "public"));

  const connectLivereload = require("connect-livereload");
  app.use(connectLivereload());

  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });
}


async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // محاولة الاتصال خلال 5 ثوانٍ
      socketTimeoutMS: 45000 // يحافظ على الاتصال لمدة 45 ثانية إذا لم يكن هناك استجابة
    });
    console.log("✅ MongoDB Connected Successfully!");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  }
}
connectDB();



app.use("/", allRoutes);
app.use("/user/add.html", addUser);
app.use("/edit", editUser);

module.exports = app;
