export default function TutorInfo({ name, department }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 bg-gray-300 rounded-full" />
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-gray-500">Department: {department}</p>
      </div>
    </div>
  );
}
