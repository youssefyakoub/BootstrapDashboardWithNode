const express = require("express");
require("dotenv").config();
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

// إعداد المحرك القوالب وملفات الاستاتيك
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// دعم تحديث البيانات باستخدام `PUT` و `DELETE`
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// استيراد المسارات
const allRoutes = require("./routes/allRoutes");
const addUser = require("./routes/addUser");
const editUser = require("./routes/editUser");

// ✅ إعداد livereload أثناء التطوير فقط
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

// ✅ الاتصال بقاعدة البيانات
async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log("✅ MongoDB Connected Successfully!");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  }
}

connectDB();

// التعامل مع أخطاء اتصال MongoDB
mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB Connection Error:", err);
});

// ✅ استخدام المسارات
app.use("/", allRoutes);
app.use("/user/add.html", addUser);
app.use("/edit", editUser);

// تشغيل السيرفر
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}/`);
});

module.exports = app;
