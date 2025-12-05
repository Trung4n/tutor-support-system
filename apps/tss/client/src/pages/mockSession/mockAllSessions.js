// src/mock/mockSessions.js

export const allSessions = [
  {
    id: "0",
    title: "Revision for Final Exam",
    courseTitle: "Calculus I",
    tutorName: "Hoàng Tunilever",
    rating: "4.5",
    date: "Tuesday, November 4, 2025",
    time: "19:00 - 21:00",
    locationType: "Online (Google Meet)",
    locationLink: "https://meet.google.com/abc-defg-hij",
    capacity: 40,
    registered: 28,
    status: "upcoming",
    description:
      "This session focuses on revising key topics for the final exam: limits, derivatives, and integration techniques.",
    learningGoals: [
      "Review core concepts likely to appear on the exam.",
      "Practice solving exam-style problems under time pressure.",
      "Clarify any remaining questions from students.",
    ],
    img: "https://picsum.photos/id/1095/600/400",
  },
  {
    id: "1",
    title: "Docker for Beginners",
    courseTitle: "DevOps",
    tutorName: "Nancy Drew",
    rating: "4.7",
    date: "Nov 20, 2025",
    time: "19:00 - 21:00",
    locationType: "Online (Zoom)",
    locationLink: "https://zoom.us/demo16",
    capacity: 40,
    registered: 29,
    status: "upcoming",
    description: "Containerization with Docker.",
    learningGoals: ["Image", "Container"],
    img: "https://picsum.photos/id/1096/600/400",
  },
  // ... thêm các session khác
];
