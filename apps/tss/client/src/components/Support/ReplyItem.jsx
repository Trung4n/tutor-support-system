export default function ReplyItem({ reply }) {
  return (
    <div className="flex items-start gap-3 bg-[#F8F8F8] rounded-md px-4 py-3">
      <div className="w-9 h-9 rounded-full bg-gray-300 flex-shrink-0" />

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-sm text-[#0054A6]">{reply.author}</p>
          <p className="text-xs text-gray-500">{reply.date}</p>
        </div>

        <p className="text-sm mt-1">{reply.text}</p>

        <button className="text-xs text-[#0054A6] mt-1 hover:underline">
          View {reply.childCount} {reply.childCount === 1 ? "reply" : "replies"}
        </button>
      </div>
    </div>
  );
}
