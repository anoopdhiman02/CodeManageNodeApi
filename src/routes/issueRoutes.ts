import { Router } from "express";
import Repo from "../models/Repo";
import Issue from "../models/Issue";
import { authMiddleware, AuthRequest } from "../middleware/auth";

const router = Router();

// GET /issues/me
router.get("/me", authMiddleware, async (req: AuthRequest, res) => {
  const issues = await Issue.find({ author: req.user!.id }).populate("repo");
  res.json(issues);
});

// GET /repos/:owner/:name/issues
router.get("/:owner/:name/issues", async (req, res) => {
  const { name } = req.params;
  const repo = await Repo.findOne({ name });
  if (!repo) return res.status(404).json({ error: "Repo not found" });

  const issues = await Issue.find({ repo: repo._id });
  res.json(issues);
});

// POST /repos/:owner/:name/issues
router.post("/:owner/:name/issues", authMiddleware, async (req: AuthRequest, res) => {
  const { name } = req.params;
  const { title, body } = req.body;

  const repo = await Repo.findOne({ name });
  if (!repo) return res.status(404).json({ error: "Repo not found" });

  const count = await Issue.countDocuments({ repo: repo._id });

  const issue = await Issue.create({
    number: count + 1,
    title,
    body,
    repo: repo._id,
    author: req.user!.id,
  });

  res.status(201).json(issue);
});

export default router;
