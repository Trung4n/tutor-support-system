import FeedbackForm from "../../components/Feedback/FeedbackForm";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Back from "../../components/Back";

export default function FeedbackPage() {
  return (
    <div className="min-h-screen bg-[#E8E8E8]">
      <Header />

      {/* top bar: back + về home */}
      <div className="max-w-6xl mx-auto px-4 mt-20">
        <Back />
      </div>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 space-y-8 mb-6">
        <FeedbackForm />
      </main>

      <Footer />
    </div>
  );
}
