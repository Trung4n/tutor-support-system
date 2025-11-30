export default function SessionMeta({ course }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-700 mb-6">
      <div>Time start: {course.semester}</div>
      <div>Duration: {course.duration} weeks</div>
      <div>Learning Type: {course.learningType}</div>
      <div>Capacity: {course.capacity}</div>
      <div>
        Rating: ⭐ {course.rating} ({course.ratingCount?.toLocaleString()})
      </div>
    </div>
  );
}
