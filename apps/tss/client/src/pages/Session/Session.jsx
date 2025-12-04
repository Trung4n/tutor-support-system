import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Back from "../../components/Back";
import { useParams, useNavigate } from "react-router-dom";
import { CalendarDays, Clock, MapPin, User, Video } from "lucide-react";
import { useState } from "react";

// IMPORT mock của bạn
import { mockCoursesStudent } from "../mockSession/mockCoursesStudent";
import { mockCoursesTutor } from "../mockSession/mockCoursesTutor";
import { getCurrentRole } from "../../utils/auth";

export default function SessionDetailPage() {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  const role = getCurrentRole(); // student | tutor

  const allSessions = role === "student" ? mockCoursesStudent : mockCoursesTutor("John Doe");

  const data = allSessions.find((s) => String(s.id) === String(sessionId));

  const [session] = useState(data);

  const handleJoin = () => {
    if (!session) return;
    window.open(session.locationLink, "_blank", "noopener,noreferrer");
  };

  if (!session) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="mt-20 flex items-center justify-center text-gray-600">
          Session not found...
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

      <div className="max-w-6xl mx-auto px-4 mt-20 mb-10">
        <Back />

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main info */}
          <section className="bg-white rounded-xl shadow-md p-6 col-span-2">
            <h1 className="text-3xl font-bold text-[#001A72] mb-2">{session.title}</h1>

            <p className="text-sm text-gray-600 mb-4">
              Session for{" "}
              <span
                className="text-[#0054A6] font-semibold cursor-pointer hover:underline"
                onClick={() => navigate("/courses/" + session.id)}
              >
                {session.courseTitle}
              </span>
            </p>

            <div className="flex items-center gap-2 text-gray-700 mb-2">
              <User className="w-4 h-4" />
              <span className="font-medium">{session.tutorName}</span>
            </div>

            {/* Date / time / location */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-800 mb-6">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-[#001A72]" />
                <span>{session.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#001A72]" />
                <span>{session.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#001A72]" />
                <span>{session.locationType || session.mode}</span>
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-2">About this session</h2>
            <p className="text-gray-700 mb-6">{session.description}</p>

            <h2 className="text-xl font-semibold mb-2">Learning goals</h2>
            <ul className="list-disc ml-5 text-gray-700 space-y-1">
              {session.learningGoals?.map((g, idx) => (
                <li key={idx}>{g}</li>
              ))}
            </ul>
          </section>

          {/* Side panel */}
          <aside className="flex flex-col gap-6">
            <div className="bg-white rounded-xl shadow-md p-5">
              <h2 className="font-bold text-lg mb-3">Session status</h2>

              <div className="mb-3">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
                    ${
                      session.status === "upcoming"
                        ? "bg-green-100 text-green-700"
                        : session.status === "ongoing"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-200 text-gray-600"
                    }`}
                >
                  {session.status}
                </span>
              </div>

              <p className="text-sm text-gray-700 mb-4">
                {session.registered}/{session.capacity} students registered
              </p>

              <button
                onClick={handleJoin}
                disabled={session.status === "finished"}
                className={`w-full flex items-center justify-center gap-2 rounded-lg py-2 text-white font-semibold
                  ${
                    session.status === "finished"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#001A72] hover:bg-[#0024A5]"
                  }`}
              >
                <Video className="w-4 h-4" />
                {session.status === "finished" ? "Session ended" : "Join session"}
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-md p-5">
              <h2 className="font-bold text-lg mb-3">Quick info</h2>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Please join 5–10 minutes early.</li>
                <li>• Prepare your questions.</li>
                <li>• Make sure your microphone is working.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
