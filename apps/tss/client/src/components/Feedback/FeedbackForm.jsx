// src/components/Feedback/Feedback.jsx
import { useState } from "react";
import { Search, Send } from "lucide-react";

const mockTutors = [
  { id: 1, name: "Nguyễn Vũ Quốc An" },
  { id: 2, name: "Nguyễn Huy Lương" },
  { id: 3, name: "Admin 1" },
];

export default function FeedbackForm() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedTutor, setSelectedTutor] = useState(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSearchTutor = () => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) {
      setSearchResults([]);
      return;
    }
    const filtered = mockTutors.filter((t) => t.name.toLowerCase().includes(keyword));
    setSearchResults(filtered);
  };

  const handleSelectTutor = (tutor) => {
    setSelectedTutor(tutor);
    setSearchResults([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedTutor) {
      alert("Vui lòng chọn tutor trước khi gửi feedback.");
      return;
    }
    // TODO: call API
    alert(`Gửi feedback (mock) cho ${selectedTutor.name} với title: "${title}"`);
  };

  return (
    <section className="bg-[#FFFFFF] rounded-md px-6 py-8 shadow-md">
      <h1 className="text-3xl font-bold text-[#0054A6] mb-6">Feedback</h1>

      {/* Find tutor */}
      <div className="mb-6 max-w-md">
        <label className="block text-sm font-semibold mb-1">Find Tutor</label>
        <div className="flex items-center border border-gray-400 rounded-md overflow-hidden bg-white">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Find Tutor"
            className="flex-1 px-3 text-sm outline-none h-10"
          />
          <button
            type="button"
            onClick={handleSearchTutor}
            className="bg-[#0054A6] text-white w-10 h-10 flex items-center justify-center"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* kết quả search */}
        {searchResults.length > 0 && (
          <div className="mt-2 bg-white border border-gray-300 rounded-md shadow-sm max-w-md">
            {searchResults.map((tutor) => (
              <button
                key={tutor.id}
                type="button"
                onClick={() => handleSelectTutor(tutor)}
                className="w-full text-left px-3 py-2 text-sm hover:bg-[#E2E8F0]"
              >
                {tutor.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 max-w-3xl">
        {/* Send to */}
        <div className="flex items-center gap-4">
          <label className="w-24 text-sm font-semibold">Send to</label>
          <div className="flex-1">
            <div className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white min-w-[220px]">
              <span className="text-sm">
                {selectedTutor ? selectedTutor.name : "Chưa chọn tutor"}
              </span>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="flex items-center gap-4">
          <label className="w-24 text-sm font-semibold">Title</label>
          <div className="flex-1">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#0054A6]"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex items-start gap-4">
          <label className="w-24 text-sm font-semibold mt-2">Content</label>
          <div className="flex-1">
            {/* toolbar giả giống Support */}
            <div className="border border-gray-300 rounded-t-md bg-gray-50 px-2 py-1 flex items-center gap-2 text-sm">
              <button type="button" className="px-2 hover:bg-gray-200 rounded">
                B
              </button>
              <button type="button" className="px-2 hover:bg-gray-200 rounded italic">
                i
              </button>
              <button type="button" className="px-2 hover:bg-gray-200 rounded underline">
                U
              </button>
              <span className="w-px h-4 bg-gray-300" />
              <button type="button" className="px-2 hover:bg-gray-200 rounded">
                A
              </button>
              <button type="button" className="px-2 hover:bg-gray-200 rounded">
                ≡
              </button>
              <button type="button" className="px-2 hover:bg-gray-200 rounded">
                •
              </button>
              <button type="button" className="px-2 hover:bg-gray-200 rounded">
                1.
              </button>
              <span className="flex-1" />
              <button type="button" className="px-2 hover:bg-gray-200 rounded">
                📎
              </button>
              <button type="button" className="px-2 hover:bg-gray-200 rounded">
                📷
              </button>
              <button type="button" className="px-2 hover:bg-gray-200 rounded">
                🙂
              </button>
            </div>

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-t-0 border-gray-300 rounded-b-md px-3 py-2 h-40 resize-none bg-white focus:outline-none focus:ring-2 focus:ring-[#0054A6]"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 bg-[#0054A6] text-white rounded-md font-semibold"
          >
            <Send className="w-4 h-4" />
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}
