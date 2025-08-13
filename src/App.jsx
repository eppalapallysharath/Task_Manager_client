import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ManagerDashboard from "./pages/ManagerDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ProfilePage from "./pages/ProfilePage";

export const baseURL = "https://task-manager-server-api.onrender.com";

export default function App() {
  // const userData = localStorage.getItem("user") || null;
  const [user, setUser] = useState(null); // Store logged-in user

  // useEffect(() => {
  //   setUser(userData);
  // }, [user]);

  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />

        {/* Role-based dashboards */}
        <Route
          path="/manager"
          element={
            user?.role === "manager" ? (
              <ManagerDashboard setUser={setUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/employee"
          element={
            user?.role === "employee" ? (
              <EmployeeDashboard setUser={setUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/profile" element={<ProfilePage />}></Route>
      </Routes>
    </Router>
  );
}
