import { useNavigate } from "react-router-dom";
export default function Back() {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)} className="text-[#0054A6] mb-3">
      &larr; Back
    </button>
  );
}
