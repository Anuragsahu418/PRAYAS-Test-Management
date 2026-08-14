import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import {
  Login,
  AdminDashboard,
  StudentDashboard,
} from "./pages";

function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Allow both admin and teacher
  if (!token || (role !== "admin" && role !== "teacher")) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function StudentRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role !== "student") {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#02030a] text-white">
        {/* Main Content */}
        <main className="flex-1 w-full">
          <Routes>
            {/* Login */}
            <Route path="/" element={<Login />} />

            {/* Admin + Teacher Dashboard */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />

            {/* Student Dashboard */}
            <Route
              path="/student"
              element={
                <StudentRoute>
                  <StudentDashboard />
                </StudentRoute>
              }
            />
          </Routes>
        </main>

        {/* Global Footer */}
        <footer className="border-t border-cyan-400/10 bg-slate-950/70 backdrop-blur-xl py-4 px-4 text-center">
          <p className="text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.18em] text-cyan-300/70">
            © 2026 Anurag Sahu · PRAYAS · ALL RIGHTS RESERVED
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;