import { useParams } from "react-router-dom";

export default function Result() {
  const { id } = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100">
      <h1 className="text-4xl font-bold text-love">
        Response saved 💖
      </h1>
    </div>
  );
}
