const express = require("express");
const aiRoutes = require("./routes/ai.routes");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: [
      "https://ai-reviewer-five.vercel.app",
      "https://ai-reviewer-git-main-yash-vardhans-projects-f9575301.vercel.app",
      /https:\/\/.*\.vercel\.app$/,
      "http://localhost:5173",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/ai", aiRoutes);

module.exports = app;
