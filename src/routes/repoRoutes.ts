import { Router } from "express";
import Repo from "../models/Repo";
import Commit from "../models/Commit";
import { authMiddleware, AuthRequest } from "../middleware/auth";

const router = Router();

// GET /repos/me
router.get("/me", authMiddleware, async (req: AuthRequest, res) => {
  const repos = await Repo.find({ owner: req.user!.id });
  res.json(repos);
});

// GET /repos/:owner/:name
router.get("/:owner/:name", async (req, res) => {
  const { owner, name } = req.params;
  const repo = await Repo.findOne({ name }).populate("owner", "username");
  if (!repo) return res.status(404).json({ error: "Repo not found" });
  res.json(repo);
});

// GET /repos/:owner/:name/commits
router.get("/:owner/:name/commits", async (req, res) => {
  const { owner, name } = req.params;
  const repo = await Repo.findOne({ name }).populate("owner", "username");
  if (!repo) return res.status(404).json({ error: "Repo not found" });

  const commits = await Commit.find({ repo: repo._id }).populate("author", "username").sort({ date: -1 });
  res.json(commits);
});

export default router;
