import { useState } from "react";
import { Search } from "lucide-react";

export default function FindContact() {
  const [searchTutor, setSearchTutor] = useState("");
  const [showTutorCard, setShowTutorCard] = useState(false);

  const handleTutorSearch = () => {
    if (searchTutor.trim()) {
      // sau này call API
      setShowTutorCard(true);
    } else {
      setShowTutorCard(false);
    }
  };

  return (
    <section className="space-y-3 mb-8">
      <h2 className="font-semibold text-lg">Find contact</h2>

      <div className="flex items-center gap-2">
        <div className="flex items-center border border-gray-400 rounded-md overflow-hidden max-w-xs flex-1">
          <input
            type="text"
            placeholder="Find Tutor"
            value={searchTutor}
            onChange={(e) => setSearchTutor(e.target.value)}
            className="flex-1 px-3 text-sm outline-none h-10"
          />
          <button
            type="button"
            onClick={handleTutorSearch}
            className="bg-[#0054A6] text-white w-10 h-10 flex items-center justify-center text-sm"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      {showTutorCard && (
        <div className="bg-white rounded-md shadow border border-gray-300 p-4 flex gap-4 max-w-md">
          <div className="w-20 h-24 bg-gray-300 rounded-md overflow-hidden flex-shrink-0" />
          <div className="text-sm">
            <p className="font-semibold">Nguyễn Vũ Quốc An</p>
            <p>Education: Graduate</p>
            <p>Fields: Mathematics, Programming</p>
            <p>Group: ABCDE</p>
          </div>
        </div>
      )}
    </section>
  );
}
