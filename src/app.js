const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const levelRoutes = require("../routes/level.js");
const userRoutes = require("../routes/user.js");
const authRoutes = require("../routes/auth.js");
const kategoriBukuRoutes = require("../routes/kategoriBuku.js");
const bukuRoutes = require("../routes/buku.js");
const db = require("../models");

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Test database connection
db.sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Unable to connect to database:", err));
// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/levels", levelRoutes);
app.use("/api/users", userRoutes);
app.use("/api/kategori-buku", kategoriBukuRoutes);
app.use("/api/buku", bukuRoutes);

// app.get("/", (req, res) => res.send("Hello World!"));
// app.get("/about", (req, res) => res.send("About Page"));
// app.get("/contact", (req, res) => res.send("Contact Page"));

// app.use("*", (req, res) =>
//   res.status(404).json({ success: false, message: "Page Not Found" })
// );

app.listen(port, () => {
  console.log(` Server running at http://localhost:${port}`);
});
