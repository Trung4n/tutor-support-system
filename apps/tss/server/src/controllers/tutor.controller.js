import { tutorService } from "../services/tutor.service.js";
import { asyncHandler } from "@shared/utils/asyncHandler";

export const getTutor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const tutor = await tutorService.getTutorByUserID(id);

  res.status(200).json({
    success: true,
    message: "Tutor fetched successfully",
    data: tutor,
  });
});

export const updateTutor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const tutor = await tutorService.updateTutor(id, req.body);

  res.status(200).json({
    success: true,
    message: "Tutor updated successfully",
    data: tutor,
  });
});

//Query params: page, limit, search, sort, order, teachingStatus, facultyId, majorId, subjectId, minRating
export const getAllTutors = asyncHandler(async (req, res) => {
  const result = await tutorService.getAllTutors(req.query);

  res.status(200).json({
    success: true,
    data: result.tutors,
    pagination: result.pagination,
  });
});

//Query params: status, limit
export const getTutorSessions = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const sessions = await tutorService.getTutorSessions(id, req.query);

  res.status(200).json({
    success: true,
    data: sessions,
  });
});

//Query params: page, limit
export const getTutorFeedbacks = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await tutorService.getTutorFeedbacks(id, req.query);

  res.status(200).json({
    success: true,
    data: result.feedbacks,
    pagination: result.pagination,
  });
});
