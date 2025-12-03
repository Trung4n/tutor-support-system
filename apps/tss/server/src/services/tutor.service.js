import { Tutor } from "../models/tutor.model.js";
import { AppError } from "@shared/utils/AppError";

export const tutorService = {
  async getTutorByUserID(userID) {
    const tutor = await Tutor.findOne({ userID })
    .select('-vector') 
    .populate({
      path: 'teachables',
      select: 'code name credit',
      options: { lean: true }
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

    if (!tutor) {throw new AppError("Tutor not found", 404);}

    return tutor;
  },

  async updateTutor(id, updateData) {
    const allowedFields = [
      "phoneNumber",
      "avatar",
      "description",
      "teachables",
    ];

    const filteredData = {};
    Object.keys(updateData).forEach((key) => {
      if (allowedFields.includes(key)) {
        filteredData[key] = updateData[key];
      }
    });

    const tutor = await Tutor.findByIdAndUpdate(id, filteredData, {
      new: true,
      runValidators: true,
    })
    .select('-vector') 
    .populate({
      path: 'teachables',
      select: 'code name credit',
      options: { lean: true }
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

    if (!tutor) {throw new AppError("Tutor not found", 404);}

    return tutor;
  },

  async getAllTutors(options = {}) {
    const {
      page = 1,
      limit = 10,
      search = "",
      sort = "mostRecommended",
      order = "desc",
      teachingStatus = "active",
      faculty,
      major,
      rating,
    } = options;

    const query = { role: "tutor"};

    if (search) {
      query.$or = [
        { "name.firstName": { $regex: search, $options: "i" } },
        { "name.lastName": { $regex: search, $options: "i" } },
      ];
    }

    // Filters
    if (teachingStatus) {
      query.teachingStatus = teachingStatus;
    }
    if (faculty) {
      query.faculty = faculty;
    }
    if (major){
      query.major = major;
    }
    if (rating) {
      query["rating.average"] = { $gte: parseFloat(rating) };
    }

    const skip = (page - 1) * limit;
    const sortOrder = order === "asc" ? 1 : -1;

    const [tutors, total] = await Promise.all([
      Tutor.find(query)
      .select('-vector') 
      .populate({
        path: 'teachables',
        select: 'code name credit',
        options: { lean: true }
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
      .sort({ [sort]: sortOrder })
      .skip(skip)
      .limit(parseInt(limit))
      .lean(),
    Tutor.countDocuments(query),
  ]);

    return {
      tutors,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async getTutorSessions(tutorId, options = {}) {
    const { Session } = await import("../models/session.model.js");
    const { status, limit = 20 } = options;

    const query = { tutor: tutorId };
    if (status) {
      query.status = status;
    }

    const sessions = await Session.find(query)
      .populate("students", "userID name mail avatar")
      .populate("subject", "code name")
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .lean();

    return sessions;
  },

  async getTutorFeedbacks(tutorId, options = {}) {
    const { Feedback } = await import("../models/feedback.model.js");
    const { limit = 20, page = 1 } = options;

    const skip = (page - 1) * limit;

    const [feedbacks, total] = await Promise.all([
      Feedback.find({ tutor: tutorId })
        .populate("student", "userID name avatar")
        .populate("session", "subject")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Feedback.countDocuments({ tutor: tutorId }),
    ]);

    return {
      feedbacks,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async updateTutorRating(tutorId) {
    const { Feedback } = await import("../models/feedback.model.js");

    const feedbacks = await Feedback.find({ tutor: tutorId });
    
    if (feedbacks.length === 0) {
      return await Tutor.findByIdAndUpdate(
        tutorId,
        { rating: { average: 0, count: 0 } },
        { new: true }
      );
    }

    const totalRating = feedbacks.reduce((sum, f) => sum + f.rating, 0);
    const average = totalRating / feedbacks.length;

    const tutor = await Tutor.findByIdAndUpdate(
      tutorId,
      {
        rating: {
          average: Math.round(average * 10) / 10,
          count: feedbacks.length,
        },
      },
      { new: true }
    );

    return tutor;
  },
};
