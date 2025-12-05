import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import ListItem from "../../components/ListItem.jsx";
import { feedbackList } from "./mockFeedbackData.js";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";

// Giả sử user login tên "Nguyễn Trung An"
const CURRENT_USER = "Nguyễn Trung An";

const FeedbackItem = ({ item }) => {
  return (
    <div className="rounded-xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-[2px] transition-all duration-300 p-6 sm:p-8 relative">
      <div className="flex items-start gap-4 sm:gap-6">
        <img
          src={item.avatar}
          alt={item.sender}
          className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full object-cover shadow-md border"
        />

        <div className="flex-1">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
            Sent To: {item.receiver}
          </h3>

          <p className="text-sm sm:text-base font-medium text-gray-500">{item.date}</p>

          <div className="border-t mt-4 pt-4">
            <p className="text-[17px] sm:text-lg font-semibold text-gray-900 line-clamp-2">
              {item.title}
            </p>
            <p className="text-[17px] sm:text-lg font-normal text-gray-700 line-clamp-2">
              {item.content || "No Content"}
            </p>
          </div>

          {item.replied && item.replyDate && (
            <p className="mt-3 text-sm text-green-700 font-semibold">
              Admin replied at: {item.replyDate}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default function ViewFeedbackStudent() {
  // Hiển thị feedback do CURRENT_USER gửi
  const filteredList = feedbackList.filter(
    (fb) => fb.sender?.trim().toLowerCase() === CURRENT_USER.toLowerCase()
  );

  return (
    <div className="min-h-screen">
      <Header />

      <div className="max-w-[1440px] mx-auto mt-10 px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-10 sm:mb-14">
          <h1 className="text-4xl font-bold text-gray-800">My Sent Feedback</h1>

          <Link
            to="/send"
            className="flex items-center gap-2 px-6 py-3 bg-primary text-black rounded-lg hover:opacity-90 transition-opacity font-semibold text-lg shadow-md"
          >
            <Plus className="w-5 h-5" />
            Send Feedback
          </Link>
        </div>

        <ListItem
          itemList={filteredList}
          title=""
          itemTab={FeedbackItem}
          columns={1}
          itemsPerPage={6}
          haveSearch={false}
        />
      </div>

      <Footer />
    </div>
  );
}
