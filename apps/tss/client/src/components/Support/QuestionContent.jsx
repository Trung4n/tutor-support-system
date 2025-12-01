export default function QuestionContent({ content, image }) {
  return (
    <div className="px-4 py-4 border-b border-gray-300 space-y-4">
      <p className="whitespace-pre-line">{content}</p>

      {image && (
        <img src={image} alt="support" className="rounded-md max-w-sm w-full object-contain" />
      )}
    </div>
  );
}
