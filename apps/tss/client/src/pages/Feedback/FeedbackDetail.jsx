import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"; // Added useNavigate
import { getFeedbackById } from "./mockFeedbackData";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import {
  AlignCenter,
  AlignLeft,
  ArrowLeft,
  Bold,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  MoreHorizontal,
  Smile,
  Type,
  Underline,
} from "lucide-react";

const EditorToolbar = () => {
  const tools = [
    { icon: Bold, label: "Bold" },
    { icon: Italic, label: "Italic" },
    { icon: Underline, label: "Underline" },
    { icon: Type, label: "Font" },
    { icon: AlignLeft, label: "Align Left" },
    { icon: AlignCenter, label: "Align Center" },
    { icon: List, label: "List" },
    { icon: MoreHorizontal, label: "More" },
    { icon: LinkIcon, label: "Link" },
    { icon: ImageIcon, label: "Image" },
    { icon: Smile, label: "Emoji" },
  ];

  return (
    <div className="bg-white border-b border-gray-300 shadow-sm h-[60px] sm:h-[76px] px-4 flex items-center gap-2 overflow-x-auto no-scrollbar rounded-t-lg">
      {tools.map((Tool, index) => (
        <button
          key={index}
          type="button"
          title={Tool.label}
          className="w-10 h-10 flex-shrink-0 flex items-center justify-center hover:bg-gray-100 rounded transition-colors text-gray-600"
        >
          <Tool.icon className="w-5 h-5" />
        </button>
      ))}
    </div>
  );
};

// Helper: Consistent Form Row Layout
const FormRow = ({ label, children, alignTop = false }) => (
  <div
    className={`grid grid-cols-1 md:grid-cols-[140px_1fr] lg:grid-cols-[180px_1fr] gap-4 md:gap-8 ${alignTop ? "items-start" : "items-center"}`}
  >
    <label
      className={`text-xl sm:text-2xl lg:text-3xl font-bold font-roboto text-gray-800 ${alignTop ? "pt-3" : ""}`}
    >
      {label}
    </label>
    <div className="relative w-full">{children}</div>
  </div>
);

export default function FeedbackDetail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); // Hook initialized here
  const id = searchParams.get("id");

  // State for the text editor
  const [content, setContent] = useState("");

  const feedbackItem = getFeedbackById(id);

  if (!feedbackItem) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-xl font-bold text-gray-600">Feedback not found</div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleSubmit = () => {
    // Add your submit logic here (e.g., API call)
    console.log("Submitting reply:", content);
    navigate("/feedbacks");
  };

  return (
    <div className="bg-[#e8e8e8] min-h-screen flex flex-col">
      <Header className={"absolute top-0 w-full z-10 bg-white shadow-sm"} />
      <div className="max-w-[1440px] mx-auto mt-10 p-8 flex-grow w-full">
        <div className="flex items-center gap-4 mb-8 sm:mb-12">
          <button
            onClick={() => navigate("/feedbacks")}
            className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 hover:bg-gray-200 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 sm:w-8 sm:h-8 text-[#0a1f44]" />
          </button>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1f44] font-roboto">
            Back to Feedback
          </h1>
        </div>

        <div className="bg-white border rounded-lg shadow-lg p-8 space-y-8">
          {/* Original Feedback Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <img
                src={feedbackItem.avatar}
                alt={feedbackItem.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold text-[#0a1f44]">{feedbackItem.name}</h1>
                <p className="text-gray-500">{feedbackItem.date}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              {feedbackItem.type === "feedback" ? (
                <p className="text-lg text-gray-700">{feedbackItem.content}</p>
              ) : (
                <p className="text-lg font-bold text-gray-800">{feedbackItem.title}</p>
              )}
            </div>
          </div>

          {/* Reply Editor */}
          <FormRow label="Reply" alignTop>
            <div className="border border-black rounded-lg shadow-sm w-full">
              <EditorToolbar />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-[300px] sm:h-[400px] p-6 text-lg sm:text-xl font-roboto resize-none focus:outline-none rounded-b-lg"
                placeholder="Type your reply here..."
              />
            </div>
          </FormRow>

          {/* Submit Button */}
          <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] lg:grid-cols-[180px_1fr] gap-4 md:gap-8">
            {/* Empty div to offset the button to match the FormRow layout */}
            <div className="hidden md:block"></div>
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="w-full sm:w-[200px] h-[56px] bg-[#4CAF50] text-white rounded-lg text-2xl font-bold font-roboto hover:opacity-90 transition-all active:scale-95 shadow-md flex items-center justify-center gap-2"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
