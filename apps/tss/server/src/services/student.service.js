import { Student } from "../models/student.model.js";
import { AppError } from "@shared/utils/AppError";

export const studentService = {
  async getStudentByUserID(userID) {
    const student = await Student.findOne({ userID })
    .populate({
      path: 'major',
      select: 'name', 
      options: { lean: true }
    })
    .populate({
      path: 'faculty',
      select: 'name',
      options: { lean: true }
    })
    .lean();

    if (!student) {
      throw new AppError("Student not found", 404);
    }

    return student;
  },

  async updateStudent(id, updateData) {
    const allowedFields = [
      "phoneNumber",
      "avatar",
    ];

    const filteredData = {};
    Object.keys(updateData).forEach((key) => {
      if (allowedFields.includes(key)) {
        filteredData[key] = updateData[key];
      }
    });

    const student = await Student.findByIdAndUpdate(id, filteredData, {
      new: true,
      runValidators: true,
    })
    .populate({
      path: 'major',
      select: 'name', 
      options: { lean: true }
    })
    .populate({
      path: 'faculty',
      select: 'name',
      options: { lean: true }
    })
    .lean();

    if (!student) {throw new AppError("Student not found", 404);}

    return student;
  },

  async getStudentEnrollments(studentId) {
    const { CurrentEnrollment } = await import("../models/enrollment.model.js");
    
    const enrollments = await CurrentEnrollment.find({ student: studentId })
      .populate("subject", "code name credit")
      .sort({ semester: -1 })
      .lean();

    return enrollments;
  },

  async getStudentSessions(studentId, options = {}) {
    const { Session } = await import("../models/session.model.js");
    const { status, limit = 20 } = options;

    const query = { students: studentId };
    if (status) {
      query.status = status;
    }

    const sessions = await Session.find(query)
      .populate("tutor", "userID name mail avatar rating")
      .populate("subject", "code name")
      .limit(parseInt(limit))
      .lean();

    return sessions;
  },
};
