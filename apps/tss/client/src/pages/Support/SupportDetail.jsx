import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
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

const STORAGE_KEY = "supportQuestions";

/* Toolbar */
const EditorToolbar = ({ disabled = false }) => {
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
          disabled={disabled}
          className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100"
        >
          <Tool.icon className="w-5 h-5" />
        </button>
      ))}
    </div>
  );
};

const FormRow = ({ label, children, alignTop = false }) => (
  <div
    className={`grid grid-cols-1 md:grid-cols-[140px_1fr] lg:grid-cols-[180px_1fr] gap-6 ${alignTop ? "items-start" : "items-center"}`}
  >
    <label className="text-xl sm:text-2xl font-bold text-gray-800">{label}</label>
    {children}
  </div>
);

export default function SupportDetail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);

  const [showReply, setShowReply] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const idParam = searchParams.get("id");

  /* Load question */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    const list = JSON.parse(saved);
    const found = list.find((q) => String(q.id) === String(idParam));

    // Nếu chưa có replies thì add mảng rỗng để tránh undefined
    if (found && !found.replies) found.replies = [];

    setQuestion(found || null);
  }, [idParam]);

  /* SAVE REPLY INTO localStorage */
  const handleSubmitReply = () => {
    if (!replyContent.trim()) {
      alert("Vui lòng nhập nội dung phản hồi!");
      return;
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    const list = JSON.parse(saved);
    const index = list.findIndex((q) => String(q.id) === String(idParam));

    if (index !== -1) {
      const now = new Date().toLocaleString("vi-VN");

      // Nếu chưa có replies, thêm mảng
      if (!list[index].replies) list[index].replies = [];

      // Thêm reply
      list[index].replies.push({
        content: replyContent,
        date: now,
      });

      // Tăng answers
      list[index].answers = (list[index].answers || 0) + 1;

      // Lưu lại
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));

      // Cập nhật UI
      setQuestion(list[index]);
    }

    setReplyContent("");
    setShowReply(false);
  };

  const handleToggleReply = () => {
    setShowReply(!showReply);
  };

  if (!question) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center text-gray-500 text-xl">
          Question not found.
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 pt-24 pb-10">
        {/* Back */}
        <button
          onClick={() => navigate("/support")}
          className="flex items-center gap-2 text-[#0a1f44] hover:underline mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Support
        </button>

        <section className="bg-white p-6 rounded-xl border shadow-md">
          <h1 className="text-2xl font-bold mb-2">{question.title}</h1>

          <p className="text-sm text-gray-600 mb-4">
            By <b>{question.user}</b> • {question.date} • Answers: {question.answers}
          </p>

          <div className="border-t pt-4 mb-6">
            <p className="whitespace-pre-line">{question.fullContent}</p>
          </div>

          {/* Show existing replies */}
          {question.replies && question.replies.length > 0 && (
            <div className="mb-6 space-y-4">
              {question.replies.map((r, i) => (
                <div key={i} className="p-3 bg-gray-100 rounded-lg">
                  <p className="text-gray-800">{r.content}</p>
                  <p className="text-sm text-gray-500">{r.date}</p>
                </div>
              ))}
            </div>
          )}

          {/* Reply button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={handleToggleReply}
              className="text-blue-600 font-medium hover:underline text-sm"
            >
              {showReply ? "Cancel" : "Reply"}
            </button>
          </div>

          {/* Reply editor */}
          {showReply && (
            <div className="mt-4 border-t pt-6 space-y-6">
              <FormRow label="Reply" alignTop>
                <div className="border border-black rounded-lg shadow-sm w-full">
                  <EditorToolbar />
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="w-full h-[200px] p-4 text-base rounded-b-lg focus:outline-none"
                    placeholder="Type your reply..."
                  />
                </div>
              </FormRow>

              <div className="flex justify-end">
                <button
                  onClick={handleSubmitReply}
                  className="bg-[#4CAF50] text-white px-5 py-2 rounded-lg font-bold hover:opacity-90"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
