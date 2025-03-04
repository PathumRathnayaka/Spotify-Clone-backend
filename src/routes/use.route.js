import { Router } from "express";

const router = Router();
router.get("/", (req, res) => {
  res.send("use route with GET method");
});

export default router;