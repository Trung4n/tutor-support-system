import { Plus, Eye, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ListItem from "../../components/ListItem.jsx";
import { feedbackList } from "./mockFeedbackData.js";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";

const FeedbackItem = ({ item }) => {
  return (
    <div className="rounded-xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-[2px] transition-all duration-300 p-6 sm:p-8 relative">
      <div className="flex items-start gap-4 sm:gap-6">
        {/* Avatar */}
        <img
          src={item.avatar}
          alt={item.name}
          className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full object-cover shadow-md border"
        />

        <div className="flex-1">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
            {item.name}
          </h3>

          <p className="text-sm sm:text-base font-medium text-gray-500">{item.date}</p>

          {/* Status Badge */}
          <div className="mt-1">
            {item.replied ? (
              <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-[3px] rounded-lg text-xs font-semibold">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                Responded
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-2 py-[3px] rounded-lg text-xs font-semibold">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                Pending
              </span>
            )}
          </div>

          {/* Content */}
          <div className="border-t mt-4 pt-4">
            {item.type === "feedback" ? (
              <p className="text-[17px] sm:text-lg font-normal text-gray-700 line-clamp-2">
                {item.content || "No content available"}
              </p>
            ) : (
              <p className="text-[17px] sm:text-lg font-semibold text-gray-900 line-clamp-2">
                {item.title}
              </p>
            )}
          </div>

          {item.replied && item.replyDate && (
            <p className="mt-3 text-sm text-green-700 font-semibold">
              Response sent at: {item.replyDate}
            </p>
          )}
        </div>

        {/* View Button */}
        <div className="flex items-center">
          <Link
            to={`/feedbacks/detail?id=${item.id}`}
            className="flex items-center gap-2 px-4 py-2 bg-[#003366] text-white rounded-xl hover:bg-black transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Eye className="w-4 h-4" />
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function ViewFeedback() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Header />

      <div className="max-w-[1440px] mx-auto mt-10 px-4 sm:px-6 lg:px-8 py-12">
        {/* Back button */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/my-sessions")}
            className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 hover:bg-gray-200 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 sm:w-8 sm:h-8 text-[#0a1f44]" />
          </button>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">Back</h1>
        </div>

        {/* Feedback List Container */}
        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm">
          {/* Title inside the white container */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
            Feedback
          </h2>

          <ListItem
            itemList={feedbackList}
            title=""
            itemTab={FeedbackItem}
            columns={1}
            itemsPerPage={6}
            haveSearch={false}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
