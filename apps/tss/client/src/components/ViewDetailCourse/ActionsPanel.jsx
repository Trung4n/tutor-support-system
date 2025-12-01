export default function ActionsPanel({ onEnroll }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5">
      <h2 className="font-bold text-xl mb-4">Actions</h2>

      <div className="flex flex-col gap-3">
        <button onClick={onEnroll} className="bg-[#001A72] text-white rounded-lg py-2 w-full">
          Enroll
        </button>

        <button className="border rounded-lg py-2 w-full">View Tutor Detail</button>
        <button className="border rounded-lg py-2 w-full">Chat with Tutor</button>
      </div>
    </div>
  );
}
