import { studentService } from "../services/student.service.js";
import { asyncHandler } from "@shared/utils/asyncHandler";

export const getStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const student = await studentService.getStudentByUserID(id);

  res.status(200).json({
    success: true,
    message: "Student fetched successfully",
    data: student,
  });
});

export const updateStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const student = await studentService.updateStudent(id, req.body);

  res.status(200).json({
    success: true,
    message: "Student updated successfully",
    data: student,
  });
});

export const getStudentEnrollments = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const enrollments = await studentService.getStudentEnrollments(id);

  res.status(200).json({
    success: true,
    data: enrollments,
  });
});

export const getStudentSessions = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const sessions = await studentService.getStudentSessions(id, req.query);

  res.status(200).json({
    success: true,
    data: sessions,
  });
});


