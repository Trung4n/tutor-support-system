import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function QuestionsList({ questions }) {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Tổng tất cả câu hỏi (KHÔNG phụ thuộc search)
  const totalQuestions = questions.length;

  // Filter theo search
  const filteredQuestions = questions.filter((q) =>
    q.title.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredQuestions.length / pageSize) || 1;
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const pageQuestions = filteredQuestions.slice(startIndex, startIndex + pageSize);

  const handleRowClick = (id) => {
    // route chi tiết: /support/:questionId
    navigate(`/support/${id}`);
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        {/* Hiển thị tổng số câu hỏi đã post */}
        <h2 className="font-semibold text-lg">{totalQuestions} questions</h2>

        {/* Search bar giống header */}
        <div className="flex items-center gap-2">
          <div className="flex items-center border border-gray-400 rounded-md overflow-hidden max-w-xs bg-white">
            <input
              type="text"
              placeholder="search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="flex-1 px-3 text-sm outline-none h-10"
            />
            <button
              type="button"
              onClick={() => setCurrentPage(1)}
              className="bg-[#0054A6] text-white w-10 h-10 flex items-center justify-center"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-md shadow border border-gray-300">
        {/* Header row */}
        <div className="grid grid-cols-4 bg-[#001A72] text-white font-semibold text-sm px-4 py-2 rounded-t-md">
          <div>Problem</div>
          <div>User</div>
          <div>Date</div>
          <div className="text-right">Answers</div>
        </div>

        {/* Rows theo trang */}
        {pageQuestions.map((q, idx) => (
          <div
            key={q.id}
            onClick={() => handleRowClick(q.id)}
            className={`grid grid-cols-4 px-4 py-2 text-sm items-center cursor-pointer ${
              idx % 2 === 0 ? "bg-[#F5F5F5]" : "bg-white"
            } hover:bg-[#E2E8F0]`}
          >
            <div className="truncate">{q.title}</div>
            <div className="truncate">{q.user}</div>
            <div>{q.date}</div>
            <div className="text-right">{q.answers} answers</div>
          </div>
        ))}

        {/* Pagination */}
        <div className="flex justify-start items-center gap-3 px-4 py-2 border-t border-gray-200 text-sm">
          <button
            onClick={() => setCurrentPage((p) => (p > 1 ? p - 1 : p))}
            disabled={safePage === 1}
            className={`px-2 py-1 rounded ${
              safePage === 1 ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-200"
            }`}
          >
            «
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-2 py-1 rounded text-xs ${
                  page === safePage ? "bg-[#001A72] text-white" : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((p) => (p < totalPages ? p + 1 : p))}
            disabled={safePage === totalPages}
            className={`px-2 py-1 rounded ${
              safePage === totalPages ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-200"
            }`}
          >
            »
          </button>
        </div>
      </div>
    </section>
  );
}
