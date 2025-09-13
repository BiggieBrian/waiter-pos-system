import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const SessionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/sessions/${id}`);
        setSession(res.data);
      } catch (err) {
        const msg = err.response?.data?.message || "Invalid session";
        const redirectTable = err.response?.data?.tableId;

        toast.error(msg);

        setTimeout(() => {
          if (redirectTable) {
            navigate(`/start/${redirectTable}`);
          } else {
            navigate("/start"); // fallback
          }
        }, 2000);
      }
    };
    fetchSession();
  }, [id, navigate]);

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">Loading session...</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome to your session</h1>
      <p>Table: {session.table.number}</p>
      <p>Waiter: {session.waiter.name}</p>
    </div>
  );
};

export default SessionPage;
