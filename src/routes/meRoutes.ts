import { Router } from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth";
import User from "../models/User";

const router = Router();

router.get("/", authMiddleware, async (req: AuthRequest, res) => {
  const me = await User.findById(req.user!.id).select("username name avatarUrl bio");
  res.json(me);
});

export default router;
