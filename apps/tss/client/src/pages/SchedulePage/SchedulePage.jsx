import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FullCalendarBasic from "../../components/SchedulePage/FullCalendarBasic";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registeredEvents } from "./scheduleEvents"; // file bạn đã có

export default function SchedulePage() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();

  const handleEventClick = (info) => {
    const e = info.event;
    const props = e.extendedProps || {};

    setSelectedEvent({
      id: e.id,
      title: e.title,
      tutor: props.tutor,
      session: props.session,
      type: props.type,
      location: props.location,
      start: e.start,
      end: e.end,
    });
  };

  const handleRegister = () => {
    if (!selectedEvent?.id) return;
    // Dùng id của event làm sessionId: /course/1, /course/2,...
    navigate(`/course/${selectedEvent.id}`);
  };

  return (
    <div className="min-h-screen bg-[#e6e6e6]">
      <Header />
      <div className="mt-10 px-6 py-6 mb-5">
        <section className="bg-white px-6 py-6 max-w-[1300px] mx-auto rounded-xl shadow">
          <h2 className="text-xl font-bold mb-3 text-[#030391]">My Registered Schedule</h2>

          {/* Lịch dùng mock events */}
          <FullCalendarBasic events={registeredEvents} onEventClick={handleEventClick} />

          {/* Box hiển thị session đã chọn + nút Đăng ký */}
          {selectedEvent && (
            <div className="mt-6 border-t pt-4">
              <h3 className="text-lg font-semibold mb-2 text-[#030391]">Selected session</h3>

              <p className="text-sm text-gray-700">
                <span className="font-medium">Title:</span> {selectedEvent.title}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Tutor:</span> {selectedEvent.tutor}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Session:</span> {selectedEvent.session}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Type:</span> {selectedEvent.type}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Location:</span>{" "}
                {selectedEvent.location || "Google Meet link"}
              </p>

              <button
                onClick={handleRegister}
                className="mt-3 px-4 py-2 rounded-md bg-[#030391] text-white font-semibold hover:bg-[#02026e]"
              >
                Đăng ký
              </button>
            </div>
          )}
        </section>
      </div>
      <Footer />
    </div>
  );
}
