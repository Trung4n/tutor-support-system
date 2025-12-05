const mockSchedules = [
  {
    _id: "s1",
    date: "23-11-2025",
    startTime: "09:00",
    endTime: "11:00",
    user: {
      name: { firstName: "Hoàng", lastName: "Tunilever" },
    },
    type: "online",
    location: "https://meet.google.com/abc-defg-hij",
  },
  {
    _id: "s2",
    date: "24-11-2025",
    startTime: "14:00",
    endTime: "16:00",
    user: {
      name: { firstName: "Minh", lastName: "Nguyễn" },
    },
    type: "offline",
    location: "Room A1.102",
  },
];
export default mockSchedules;
