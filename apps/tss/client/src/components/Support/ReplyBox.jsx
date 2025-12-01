import { useState } from "react";
import { Send, X } from "lucide-react";

export default function ReplyBox({ onSend }) {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
    setShow(false);
  };

  const handleCancel = () => {
    setText("");
    setShow(false);
  };

  return (
    <div className="w-full">
      {/* nút Reply */}
      {!show && (
        <button
          onClick={() => setShow(true)}
          className="flex items-center gap-1 text-sm text-[#0054A6] hover:underline ml-auto"
        >
          Reply
        </button>
      )}

      {/* khung nhập reply */}
      {show && (
        <div className="border border-gray-300 rounded-md p-3 mt-2 bg-white">
          <textarea
            placeholder="Write your reply..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-24 resize-none border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0054A6]"
          />

          <div className="flex justify-start gap-3 mt-3">
            <button
              onClick={handleSend}
              className="flex items-center gap-2 px-5 py-2 rounded-md bg-[#009879] text-white text-sm font-semibold"
            >
              <Send size={16} />
              Send
            </button>

            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-5 py-2 rounded-md bg-[#001A72] text-white text-sm font-semibold"
            >
              <X size={16} />
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
