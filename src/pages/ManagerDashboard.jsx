import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ManagerDashboard() {
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.assignedTo) {
      return toast.error("All fields are required");
    }
    setTickets([...tickets, { ...form, status: "To Do" }]);
    setForm({ title: "", description: "", assignedTo: "" });
    toast.success("Ticket created");
  };

  const employees = [
    { id: "emp1", name: "John Doe" },
    { id: "emp2", name: "Jane Smith" },
    { id: "emp3", name: "Michael Johnson" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manager Dashboard</h1>
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
            <option key={emp.id} value={emp.id}>
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
          <p className="text-sm text-gray-500">Assigned to: {t.assignedTo}</p>
        </div>
      ))}
    </div>
  );
}
