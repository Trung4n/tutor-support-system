// Main router file to aggregate all route modules
import express from "express";
import { router as studentRoutes } from "./student.routes.js";
import { router as tutorRoutes } from "./tutor.routes.js";

const router = express.Router();
router.use("/student", studentRoutes);
router.use("/tutor", tutorRoutes);

export default router;
