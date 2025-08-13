import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function Navbar() {
  const { currentUser, logout } = useContext(AppContext);
  const location = useLocation();

  const linkClasses = (path) =>
    `px-3 py-2 rounded-lg ${
      location.pathname === path ? "bg-blue-600 text-white" : "hover:bg-blue-50"
    }`;

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="font-semibold">Task Manager</div>
        <div className="flex gap-2 items-center">
          <Link className={linkClasses("/manager")} to="/manager">
            Manager
          </Link>
          <Link className={linkClasses("/employee")} to="/employee">
            Employee
          </Link>
        </div>
        <div className="flex items-center gap-3">
          {currentUser && (
            <span className="text-sm text-gray-600">
              {currentUser.name} ({currentUser.role})
            </span>
          )}
          <button
            onClick={logout}
            className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
