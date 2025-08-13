import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Logout from "../components/logout";
import axios from "axios";
import { baseURL } from "../App";

export default function ManagerDashboard({ setUser }) {
  const [tickets, setTickets] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.assignedTo) {
      return toast.error("All fields are required");
    }
    try {
      const res = await axios.post(
        `${baseURL}/ticket/create`,
        {
          title: form.title,
          description: form.description,
          assignTo: form.assignedTo,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(res);
      toast.success(res.data.message);
      getTasksList();
    } catch (error) {
      console.log(error);
    }
  };

  const token = localStorage.getItem("token");
  const getEmpList = async () => {
    try {
      const res = await axios.get(`${baseURL}/ticket/getAllEmployees`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const getTasksList = async () => {
    try {
      const res = await axios.get(`${baseURL}/ticket/allTickets`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTickets(res.data.data);
      toast.success(res.data.data.message);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong unable to fetch tasks");
    }
  };
  useEffect(() => {
    getEmpList();
    getTasksList();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manager Dashboard</h1>
      <Link to="/profile">
        <button className="btn btn-blue">ProfilePage </button>
      </Link>
      <Logout setUser={setUser} />
      <form
        onSubmit={handleSubmit}
        className="mb-6 bg-white p-4 rounded shadow"
      >
        <input
          type="text"
          name="title"
          placeholder="Ticket Title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 mr-2 rounded"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 mr-2 rounded"
        />
        <select
          name="assignedTo"
          value={form.assignedTo}
          onChange={handleChange}
          className="border p-2 mr-2 rounded"
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp._id}>
              {emp.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Ticket
        </button>
      </form>
      <h2 className="text-xl font-semibold mb-2">Tickets</h2>
      {tickets.map((t, i) => (
        <div key={i} className="p-3 border-b">
          <p>
            <strong>{t.title}</strong> — {t.description}
          </p>
          <p className="text-sm text-gray-500">
            Assigned to: {t.assignTo?.username}
          </p>
        </div>
      ))}
    </div>
  );
}
