const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const issueRoutes = require("./routes/issue.routes");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/auth", authRoutes);
app.use("/issues", issueRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "TrackIT backend is running"
  });
});

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
