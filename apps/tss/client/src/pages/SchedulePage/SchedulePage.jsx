import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FullCalendarBasic from "../../components/SchedulePage/FullCalendarBasic";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registeredEvents } from "./scheduleEvents";
import { CheckCircle } from "lucide-react";

export default function SchedulePage() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registered, setRegistered] = useState(false); // trạng thái đã đăng ký
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
    setRegistered(false); // reset khi chọn session mới
  };

  const handleRegister = () => {
    if (!selectedEvent?.id) return;

    // Đánh dấu đã đăng ký
    setRegistered(true);

    // Nếu muốn điều hướng sau khi đăng ký, có thể gọi navigate ở đây
    // navigate(`/course/${selectedEvent.id}`);
  };

  return (
    <div className="min-h-screen bg-[#e6e6e6] relative">
      <Header />
      <div className="mt-10 px-6 py-6 mb-5">
        <section className="bg-white px-6 gap-5 flex-row py-6 max-w-[1300px] mx-auto rounded-xl shadow flex">
          {/* Calendar */}
          <div className="w-full">
            <h2 className="text-xl font-bold mb-4 text-[#030391]">Schedule of Tutor</h2>
            <FullCalendarBasic events={registeredEvents} onEventClick={handleEventClick} />
          </div>

          {/* Sidebar Chi tiết session */}
          {selectedEvent && !registered && (
            <div className="mt-6 max-w-[250px] w-full border-l pl-6">
              <h3 className="text-lg font-semibold mb-3 text-[#030391]">Selected session</h3>

              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <span className="font-medium">Title:</span> {selectedEvent.title}
                </p>
                <p>
                  <span className="font-medium">Tutor:</span> {selectedEvent.tutor}
                </p>
                <p>
                  <span className="font-medium">Session:</span> {selectedEvent.session}
                </p>
                <p>
                  <span className="font-medium">Type:</span> {selectedEvent.type}
                </p>
                <p>
                  <span className="font-medium">Location:</span>{" "}
                  {selectedEvent.location || "Google Meet link"}
                </p>
              </div>

              <button
                onClick={handleRegister}
                className="mt-4 w-full px-4 py-2 rounded-md bg-[#030391] text-white font-semibold hover:bg-[#02026e] transition-all"
              >
                Register
              </button>
            </div>
          )}

          {/* Thông báo đăng ký */}
          {selectedEvent && registered && (
            <div className="mt-6 max-w-[250px] w-full border-l pl-6 flex flex-col items-center justify-center">
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-md flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">Registration successful!</span>
              </div>
            </div>
          )}
        </section>
      </div>
      <Footer />
    </div>
  );
}
