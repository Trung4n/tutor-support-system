import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Back from "../../components/Back";
import SupportForm from "../../components/Support/SupportForm";
import QuestionsList from "../../components/Support/QuestionsList";
import FindContact from "../../components/Support/FindContact";

const mockQuestions = [
  { id: 1, title: "Problem1", user: "Nguyễn Vũ Quốc An", date: "08/04/2025", answers: 5 },
  {
    id: 2,
    title: "I have problem with...",
    user: "Nguyễn Vũ Quốc An",
    date: "25/10/2025",
    answers: 0,
  },
  { id: 3, title: "Problem2", user: "Nguyễn Vũ Quốc An", date: "23/10/2025", answers: 0 },
  { id: 4, title: "Problem3", user: "Nguyễn Vũ Quốc An", date: "23/10/2025", answers: 0 },
  { id: 5, title: "Problem4", user: "Nguyễn Vũ Quốc An", date: "23/10/2025", answers: 0 },
  { id: 6, title: "Problem5", user: "Nguyễn Vũ Quốc An", date: "25/10/2025", answers: 0 },
  { id: 7, title: "Problem6", user: "Nguyễn Vũ Quốc An", date: "25/10/2025", answers: 0 },
  {
    id: 8,
    title: "Hết bài + viết lại :v",
    user: "Nguyễn Vũ Quốc An",
    date: "25/10/2025",
    answers: 0,
  },
];

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-[#E8E8E8]">
      <Header />

      {/* top bar: back + về home */}
      <div className="max-w-6xl mx-auto px-4 mt-20">
        <Back />
      </div>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 space-y-8 mb-6">
        <SupportForm />
        <QuestionsList questions={mockQuestions} />
        <FindContact />
      </main>

      <Footer />
    </div>
  );
}
