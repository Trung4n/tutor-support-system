export default function SessionObjectives({ list }) {
  return (
    <>
      <h2 className="text-xl font-semibold mb-2">Learning Objectives</h2>
      <ul className="list-disc ml-5 text-gray-700 space-y-1 mb-8">
        {list?.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </>
  );
}
