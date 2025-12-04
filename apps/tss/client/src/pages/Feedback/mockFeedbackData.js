// src/data/mockFeedbackData.js

export let feedbackList = [
  {
    id: 1,
    name: "Nguyễn Trung An",
    date: "09/04/2025, 11:15",
    title: "Thầy Trung đẹp trai quá ạ",
    content:
      "Trong suốt quá trình học tập ở giảng đường đại học, thầy là người em yêu mến, kính trọng và đẹp trai nhất em từng gặp.",
    avatar: "https://i.pravatar.cc/150?img=22",
    type: "question",
    replied: false,
    replyContent: "",
    replyDate: null,
  },
  {
    id: 2,
    name: "Nguyễn Vũ Quốc An",
    date: "08/04/2025, 09:30",
    title: "Hệ thống thường xuyên bị đăng xuất",
    content:
      "Trong quá trình học online, em thường xuyên bị hệ thống tự động đăng xuất mặc dù mạng vẫn ổn định. Điều này làm gián đoạn bài giảng và ảnh hưởng đến trải nghiệm học tập.",
    avatar: "https://i.pravatar.cc/150?img=12",
    type: "question",
    replied: false,
    replyContent: "",
    replyDate: null,
  },

  {
    id: 3,
    name: "Phan Hoàng Kiên",
    date: "10/04/2025, 14:45",
    title: "Giao diện khó sử dụng trên điện thoại",
    content:
      "Khi dùng điện thoại, giao diện bị vỡ và rất khó thao tác. Mong hệ thống sớm update lại giao diện mobile.",
    avatar: "https://i.pravatar.cc/150?img=33",
    type: "question",
    replied: false,
    replyContent: "",
    replyDate: null,
  },
  {
    id: 4,
    name: "Lê Quốc Kiệt",
    date: "11/04/2025, 10:00",
    title: "Tính năng ghi chú chưa hoạt động",
    content: "Mình không thể lưu ghi chú trong bài học, khi reload trang ghi chú bị mất hết.",
    avatar: "https://i.pravatar.cc/150?img=44",
    type: "question",
    replied: false,
    replyContent: "",
    replyDate: null,
  },
  {
    id: 5,
    name: "Trần Huỳnh Hạ Lam",
    date: "11/04/2025, 13:30",
    title: "Bài tập cuối cùng không tải được",
    content: "Mình click vào bài tập cuối cùng thì trang trắng, không load được nội dung.",
    avatar: "https://i.pravatar.cc/150?img=55",
    type: "question",
    replied: false,
    replyContent: "",
    replyDate: null,
  },
  {
    id: 6,
    name: "Trần Gia Kiệt",
    date: "12/04/2025, 09:15",
    title: "Không nhận được thông báo",
    content: "Mình đã bật thông báo nhưng không thấy báo khi có bài học mới.",
    avatar: "https://i.pravatar.cc/150?img=66",
    type: "question",
    replied: false,
    replyContent: "",
    replyDate: null,
  },
  {
    id: 7,
    name: "Nguyễn Huy Lượng",
    date: "12/04/2025, 11:50",
    title: "Âm thanh bài giảng bị rè",
    content: "Âm thanh khi phát bài giảng bị rè, nghe rất khó chịu, mong được fix sớm.",
    avatar: "https://i.pravatar.cc/150?img=66",
    type: "question",
    replied: false,
    replyContent: "",
    replyDate: null,
  },
];

// ✅ Lấy feedback theo ID
export const getFeedbackById = (id) => {
  return feedbackList.find((item) => item.id === parseInt(id));
};

// ✅ Cập nhật reply
export const replyToFeedback = (id, content) => {
  const item = feedbackList.find((f) => f.id === parseInt(id));
  if (item) {
    item.replied = true;
    item.replyContent = content;
    item.replyDate = new Date().toLocaleString("vi-VN");
  }
};
