const events = [
  {
    id: "1",
    title: "Hệ cơ sở dữ liệu",
    start: "2025-11-24T12:00:00",
    end: "2025-11-24T14:50:00",
    extendedProps: {
      tutor: "AN NGUYỄN VŨ QUỐC",
      session: "Bài giảng lý thuyết",
      type: "offline",
      location: "H6-109",
    },
  },
  {
    id: "2",
    title: "Tư vấn Online",
    start: "2025-11-25T10:00:00",
    end: "2025-11-25T11:00:00",
    backgroundColor: "#60a5fa",
    extendedProps: {
      tutor: "Tutor B",
      session: "Q&A buổi sáng",
      type: "online",
      location: null, // hoặc "" cũng được
    },
  },
];
export { events as registeredEvents };
