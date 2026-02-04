import express from "express";
import {
  createValentine,
  getValentine,
  respondValentine,
  dashboard
} from "../controllers/valentineController.js";

const router = express.Router();

router.post("/create", createValentine);
router.get("/:id", getValentine);
router.post("/respond", respondValentine);
router.get("/dashboard/:id", dashboard);

export default router;
