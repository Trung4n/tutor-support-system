import { useState } from "react";

export default function SupportForm() {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: call API
    alert("Submit support (mock).");
  };

  return (
    <section className="bg-white shadow-md border-[#0054A6] rounded-md p-6">
      <h1 className="text-3xl font-bold text-[#0054A6] mb-4">Support</h1>

      {!showForm && (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="mb-2 px-4 py-2 rounded-md bg-[#00A0D2] text-white font-semibold"
        >
          Send your problem
        </button>
      )}

      {showForm && (
        <>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="mb-4 px-4 py-2 rounded-md bg-[#00A0D2] text-white font-semibold"
          >
            Hide form
          </button>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block mb-1 font-semibold">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0054A6]"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block mb-1 font-semibold">Content</label>

              {/* toolbar giả giống Figma */}
              <div className="border border-gray-300 rounded-t-md bg-gray-50 px-2 py-1 flex items-center gap-2 text-sm">
                <button type="button" className="px-2 hover:bg-gray-200 rounded">
                  B
                </button>
                <button type="button" className="px-2 hover:bg-gray-200 rounded italic">
                  I
                </button>
                <button type="button" className="px-2 hover:bg-gray-200 rounded underline">
                  U
                </button>
                <span className="w-px h-4 bg-gray-300" />
                <button type="button" className="px-2 hover:bg-gray-200 rounded">
                  A
                </button>
                <button type="button" className="px-2 hover:bg-gray-200 rounded">
                  &#8801;
                </button>
                <button type="button" className="px-2 hover:bg-gray-200 rounded">
                  &#8226;
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
                className="w-full border border-t-0 border-gray-300 rounded-b-md px-3 py-2 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-[#0054A6]"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-[#001A72] text-white rounded-md font-semibold"
              >
                Submit
              </button>
            </div>
          </form>
        </>
      )}
    </section>
  );
}
