import ReplyItem from "./ReplyItem";

export default function RepliesList({ replies }) {
  return (
    <div className="mt-3 space-y-3">
      {replies.map((reply) => (
        <ReplyItem key={reply.id} reply={reply} />
      ))}
    </div>
  );
}
