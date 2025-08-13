import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

export default function TicketForm() {
  const { users, createTicket } = useContext(AppContext);
  const employees = users.filter((u) => u.role === "employee");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState(employees[0]?.id || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !assignedTo) return;
    const ticket = {
      id: Date.now(),
      title,
      description,
      status: "To Do",
      assignedTo: Number(assignedTo),
      comments: [],
    };
    createTicket(ticket);
    setTitle("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow p-4 border mb-6"
    >
      <h2 className="text-xl font-semibold mb-3">Create Ticket</h2>
      <div className="grid md:grid-cols-2 gap-3">
        <input
          className="border rounded-lg p-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <select
          className="border rounded-lg p-2"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        >
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name} (ID {emp.id})
            </option>
          ))}
        </select>
        <textarea
          className="md:col-span-2 border rounded-lg p-2"
          rows="3"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="mt-3 px-4 py-2 rounded-xl bg-blue-600 text-white"
      >
        Add Ticket
      </button>
    </form>
  );
}
