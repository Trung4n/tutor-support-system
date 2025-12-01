export default function QuestionHeader({ author, date }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-300">
      <div className="w-10 h-10 rounded-full bg-gray-300" />
      <div>
        <p className="font-semibold text-[#0054A6]">{author}</p>
        <p className="text-xs text-gray-500">{date}</p>
      </div>
    </div>
  );
}
