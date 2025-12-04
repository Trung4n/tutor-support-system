// src/mock/mockCoursesTutor.js

const TUTOR_COURSE_TITLES = [
  "React Fundamentals",
  "Node.js API",
  "Docker Basics",
  "System Design",
  "Database Optimization",
];

export const mockCoursesTutor = (tutorName = "John Doe") =>
  Array.from({ length: 60 }, (_, i) => ({
    id: i.toString(),
    title: TUTOR_COURSE_TITLES[i % TUTOR_COURSE_TITLES.length],
    courseTitle: "Computer Science",
    tutorName,
    rating: (Math.random() * 0.9 + 4.1).toFixed(1),

    date: "Nov " + (10 + (i % 20)) + ", 2025",
    time: "18:30 - 20:30",

    locationType: i % 2 === 0 ? "Online (Zoom)" : "Offline at Campus",
    locationLink: "https://zoom.us/demo" + i,

    capacity: 40,
    registered: 20 + (i % 15),

    status: i % 3 === 0 ? "upcoming" : i % 3 === 1 ? "ongoing" : "finished",

    description: "This is a guided tutor session helping students master key concepts.",
    learningGoals: ["Understand core concept", "Practice problems"],

    img: `https://picsum.photos/seed/tutor${i}/600/400`,
  }));
