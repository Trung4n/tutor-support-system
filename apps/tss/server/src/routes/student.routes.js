import { Router } from "express";
import {
  getStudent,
  updateStudent,
  getStudentEnrollments,
  getStudentSessions,
} from "../controllers/student.controller.js";

export const router = Router();

// DEFINE ROUTES HERE
// Example:
// router.get("/:id",getStudent);
// router.put("/:id",updateStudent);
// router.get("/list",getAllStudents);
// Ex: api/student/list?page=1&limit=10&search=abc&sort=asc&....
router.get("/:id", getStudent);
router.put("/:id", updateStudent);

router.get("/:id/enrollments", getStudentEnrollments);
router.get("/:id/sessions", getStudentSessions);
