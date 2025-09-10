import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes";
import repoRoutes from "./routes/repoRoutes";
import issueRoutes from "./routes/issueRoutes";
import meRoutes from "./routes/meRoutes";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/repos", repoRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/me", meRoutes);


const PORT = process.env.PORT || 4000;
app.use(function (err, req, res, next) {
    res.status(500).json({ message: err.message });
  } as express.ErrorRequestHandler);
  
  app.get("/", (req, res) => {
    res.json({ status: "200", message: "This is server message" });
  });
  
  app.listen(PORT, () => {
    console.log(`this app is running on http://localhost:${PORT}`);
  });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));