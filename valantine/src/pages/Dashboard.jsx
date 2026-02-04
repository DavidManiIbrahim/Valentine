import { useParams, useEffect, useState } from "react";
import API from "../api/axios";

export default function Dashboard() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get(`/valentine/dashboard/${id}`).then(res => setData(res.data));
  }, []);

  if (!data) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Status: {data.response}</p>
      <p>Responded at: {data.respondedAt || "Pending"}</p>
    </div>
  );
}
