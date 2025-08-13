import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Logout from "../components/logout";
import axios from "axios";
import { baseURL } from "../App";
import { Link } from "react-router-dom";

export default function EmployeeDashboard({ setUser }) {
  const [tickets, setTickets] = useState([]);
  const token = localStorage.getItem("token");
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${baseURL}/employee/viewTickets`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTickets(res.data.data);
      toast.success("fetched all tasks");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  const updateStatus = async (event, id) => {
    try {
      const res = await axios.put(
        `${baseURL}/employee/updateTicketStatus/${id}`,
        { taskStatus: event.target.value },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message);
      fetchTasks();
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="p-6">
      <div>
        <h1 className="text-3xl font-bold mb-6">Employee Dashboard</h1>
      </div>
      <Link to="/profile">
        <button className="btn btn-blue">ProfilePage </button>
      </Link>

      <Logout setUser={setUser} />
      {tickets.map((t, i) => (
        <div key={i} className="p-4 border-b flex justify-between items-center">
          <div>
            <p>
              <strong>{t.title}</strong> — {t.description}
            </p>
            <p className="text-sm text-gray-500">Status: {t.status}</p>
          </div>
          <select
            value={t.status}
            onChange={(e) => updateStatus(e, t._id)}
            className="border p-1 rounded"
          >
            <option value={"To Do"}>To Do</option>
            <option value={"In Progress"}>In Progress</option>
            <option value={"Completed"}>Completed</option>
          </select>
        </div>
      ))}
    </div>
  );
}
