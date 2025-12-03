import { ChevronDown, Search, Settings2 } from "lucide-react";

function SearchBar() {
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <button className="flex items-center gap-2 px-4 py-2 border rounded-xl text-gray-500 hover:bg-gray-50 text-sm">
        All <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      <div className="flex-1 relative min-w-[200px] max-w-[400px]">
        <Settings2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-10 py-2 border rounded-xl text-sm outline-none focus:border-blue-900"
        />
        <button className="absolute right-0 top-0 h-full bg-[#1a237e] text-white px-4 rounded-r-xl">
          <Search className="w-4 h-4 text-white" />
        </button>
      </div>

      <button className="flex items-center gap-2 px-4 py-2 border rounded-xl text-gray-500 hover:bg-gray-50 text-sm">
        Sort by: Most Recommended <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>
    </div>
  );
}

export default SearchBar;
