import { useState } from "react";
// import { useParams } from "react-router-dom";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Back from "../../components/Back";

import QuestionHeader from "../../components/Support/QuestionHeader";
import QuestionContent from "../../components/Support/QuestionContent";
import RepliesList from "../../components/Support/RepliesList";
import ReplyBox from "../../components/Support/ReplyBox";

// Mock data
const mockQuestion = {
  id: 1,
  title: "Cái gì đó",
  author: "Nguyễn Vũ Quốc An",
  date: "Friday 08/04/2025",
  content: "support question here",
  repliesCount: 4405,
  replies: [
    { id: 1, author: "Nguyễn Huy Lương", date: "25/10/2025", text: "Reply 1", childCount: 1 },
    { id: 2, author: "Admin 1", date: "15/09/2025", text: "Reply 2", childCount: 5 },
  ],
};

export default function SupportQuestionDetail() {
  // const { questionId } = useParams();
  const [question] = useState(mockQuestion);

  const handleNewReply = (text) => {
    alert("Reply sent (mock): " + text);
  };

  return (
    <div className="min-h-screen bg-[#E8E8E8]">
      <Header />

      <div className="max-w-5xl mx-auto px-4 mt-20">
        <Back />
      </div>

      <main className="max-w-5xl mx-auto w-full px-4 mb-10">
        <section className="bg-white p-6 rounded-md shadow border border-gray-300 mt-4">
          <h1 className="text-3xl font-bold text-[#0054A6] mb-4">{question.title}</h1>

          <div className="border border-gray-400 rounded-md overflow-hidden bg-white">
            <QuestionHeader author={question.author} date={question.date} />
            <QuestionContent content={question.content} />

            <div className="px-4 py-4">
              <ReplyBox onSend={handleNewReply} />
            </div>
          </div>

          <div className="mt-4 text-right text-sm text-gray-600">
            {question.repliesCount} replies
          </div>

          <RepliesList replies={question.replies} />

          <div className="mt-3 text-right">
            <button className="text-sm text-[#0054A6] hover:underline">
              View more reply &gt;&gt;
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
