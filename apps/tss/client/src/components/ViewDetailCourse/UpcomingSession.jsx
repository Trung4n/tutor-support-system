export default function UpcomingSession({ data }) {
  if (!data) {
    return (
      <div className="bg-white rounded-xl shadow-md p-5">
        <h2 className="font-bold text-xl mb-4">Upcoming Session</h2>
        <p className="text-sm text-gray-500">Hiện chưa có buổi học sắp diễn ra.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-5">
      <h2 className="font-bold text-xl mb-4">Upcoming Session</h2>
      <div className="bg-[#001A72] text-white p-4 rounded-xl flex flex-col gap-2">
        <div className="text-sm">SESSION • {data.date}</div>
        <h3 className="text-lg font-semibold">{data.title}</h3>
        <p className="text-sm">{data.tutorName}</p>
        <button className="bg-white text-[#001A72] mt-2 rounded-lg py-1 w-fit px-4">
          Join now
        </button>
      </div>
    </div>
  );
}
