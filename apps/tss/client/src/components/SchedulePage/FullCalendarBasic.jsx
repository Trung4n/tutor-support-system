import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import colors from "./color";

export default function FullCalendarBasic({ events, onEventClick }) {
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Hàm hash string id -> index màu ổn định
  const getColorForId = (id) => {
    if (!id) return colors[0];
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = (hash * 31 + id.charCodeAt(i)) | 0;
    }
    const idx = Math.abs(hash) % colors.length;
    return colors[idx];
  };

  return (
    <>
      {/* TOOLTIP */}
      {hoveredEvent && (
        <div
          className="fixed z-50 bg-white shadow-xl rounded-lg p-4 text-sm w-80"
          style={{
            top: tooltipPos.y,
            left: tooltipPos.x,
          }}
        >
          {(() => {
            const props = hoveredEvent.extendedProps || {};

            return (
              <>
                <h3 className="font-bold text-base mb-2">{hoveredEvent.title}</h3>

                {/* TIME */}
                <p className="mb-1">
                  <b>Time:</b>{" "}
                  {hoveredEvent.start.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  {hoveredEvent.end &&
                    " – " +
                      hoveredEvent.end.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                </p>

                {/* TUTOR */}
                <p className="mb-1">
                  <b>Tutor:</b> {props.tutor || "N/A"}
                </p>

                {/* SESSION */}
                <p className="mb-1">
                  <b>Session:</b> {props.session || "N/A"}
                </p>

                {/* TYPE */}
                <p className="mb-1">
                  <b>Type:</b> {props.type || "N/A"}
                </p>

                {/* LOCATION nếu offline */}
                {props.type === "offline" && props.location && (
                  <p className="mb-1">
                    <b>Room:</b> {props.location}
                  </p>
                )}
              </>
            );
          })()}
        </div>
      )}

      {/* FULLCALENDAR */}
      <div
        style={{
          "--fc-button-bg-color": "#3b82f6",
          "--fc-button-text-color": "white",
          "--fc-button-border-color": "transparent",
          "--fc-button-active-border-color": "transparent",
          "--fc-button-active-bg-color": "#1d4ed8",
          "--fc-button-hover-bg-color": "#2563eb",
        }}
      >
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={events}
          selectable={true}
          editable={false}
          eventDidMount={(info) => {
            const color = getColorForId(info.event.id);
            info.el.style.backgroundColor = color;
            info.el.style.borderColor = color;
          }}
          eventMouseEnter={(info) => {
            const rect = info.el.getBoundingClientRect();
            setTooltipPos({
              x: rect.right + 10,
              y: rect.top,
            });
            setHoveredEvent(info.event);
          }}
          eventMouseLeave={() => setHoveredEvent(null)}
          eventClick={(info) => {
            if (onEventClick) onEventClick(info);
          }}
        />
      </div>
    </>
  );
}
