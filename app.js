const express = require("express");
require("dotenv").config();
const path = require("path"); // ✅ استدعاء واحد فقط
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

var methodOverride = require("method-override");
app.use(methodOverride("_method"));

// استيراد المسارات
const allRoutes = require("./routes/allRoutes");
const addUser = require("./routes/addUser");
const editUser = require("./routes/editUser");

// 🔹 إعداد livereload
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

// الاتصال بقاعدة البيانات
mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });


// استخدام المسارات
app.use("/", allRoutes);
app.use("/user/add.html", addUser);
app.use("/edit", editUser);
