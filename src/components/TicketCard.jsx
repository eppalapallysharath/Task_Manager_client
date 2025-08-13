import React from "react";

export default function TicketCard({ ticket, children }) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 border mb-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">{ticket.title}</h3>
          <p className="text-gray-700">{ticket.description}</p>
          <p className="text-sm text-gray-500 mt-1">
            Status: <span className="font-medium">{ticket.status}</span>
          </p>
          <p className="text-sm text-gray-500">
            Assigned To: {ticket.assignedTo}
          </p>
        </div>
      </div>

      {ticket.comments?.length > 0 && (
        <div className="mt-3">
          <p className="text-sm font-semibold">Comments</p>
          <ul className="list-disc ml-5 text-sm text-gray-700">
            {ticket.comments.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      )}

      {children && <div className="mt-3">{children}</div>}
    </div>
  );
}
