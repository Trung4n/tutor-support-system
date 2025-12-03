import { Router } from "express";
import {
  getTutor,
  updateTutor,
  getAllTutors,
  getTutorSessions,
  getTutorFeedbacks,
} from "../controllers/tutor.controller.js";

export const router = Router();

// DEFINE ROUTES HERE
// Example:
// router.get("/:id",getTutor);
// router.put("/:id",updateTutor);
// router.get("/list",getAllTutors);
// Ex: api/tutor/list?page=1&limit=10&search=abc&sort=asc&....
router.get("/list", getAllTutors);
router.get("/:id", getTutor);
router.put("/:id", updateTutor);

router.get("/:id/sessions", getTutorSessions);
router.get("/:id/feedbacks", getTutorFeedbacks);
