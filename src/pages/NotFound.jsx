import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 text-center">
      <div className="max-w-md">
        <h1 className="text-3xl font-bold mb-2">404 - Not Found</h1>
        <p className="text-gray-600 mb-4">
          The page you are looking for doesn't exist.
        </p>
        <Link
          to="/login"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}
