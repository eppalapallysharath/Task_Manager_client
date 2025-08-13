import React, { useState } from "react";
import toast from "react-hot-toast";

export default function EmployeeDashboard() {
  const [tickets, setTickets] = useState([
    {
      title: "Fix UI bug",
      description: "Navbar alignment issue",
      status: "To Do",
    },
  ]);

  const updateStatus = (index, status) => {
    const updated = [...tickets];
    updated[index].status = status;
    setTickets(updated);
    toast.success("Ticket status updated");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Employee Dashboard</h1>
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
            onChange={(e) => updateStatus(i, e.target.value)}
            className="border p-1 rounded"
          >
            <option>To Do</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
        </div>
      ))}
    </div>
  );
}
