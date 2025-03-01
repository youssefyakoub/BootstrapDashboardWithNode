const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
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
  res.status(404).render("404", { title: "Page Not Found" });
});

// Connect to MongoDB
mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log("✅ MongoDB Connected");
    // Start server only after DB is connected
    if (require.main === module) {
      app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
      });
    }
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

// Export the app for Vercel
module.exports = app;