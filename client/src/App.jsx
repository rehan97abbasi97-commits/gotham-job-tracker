
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useState } from "react";
import AddApplication from "./components/AddApplication";

import Sidebar from "./components/Sidebar";
import StatsCards from "./components/StatsCards";
import ApplicationsTable from "./components/ApplicationsTable";
import Analytics from "./components/Analytics";
import Login from "./components/Login";
import Register from "./components/Register";
import ApplicationsPage from "./components/ApplicationsPage";
import AnalyticsPage from "./components/AnalyticsPage";
import SettingsPage from "./components/SettingsPage";
import AboutPage from "./components/AboutPage";

function Dashboard() {
  const [showAddApplication, setShowAddApplication] = useState(false);
  const handleApplicationAdded = () => {
    window.location.reload();
  };
  return (
    <div className="flex min-h-screen flex-col bg-[#090D12] text-white lg:flex-row">
      <Sidebar onAddApplication={() => setShowAddApplication(true)} />

      <main className="min-w-0 w-full flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400">Welcome back</p>

            <h1 className="mt-2 text-3xl font-bold">
              Dashboard<span className="text-[#F2C94C]">.</span>
            </h1>

            <p className="mt-2 text-slate-400">
              Here's what's happening with your job search.
            </p>
          </div>


          <div className="rounded-xl border border-[#F2C94C]/20 bg-[#131B25] p-4">
            <p className="text-xs font-semibold tracking-widest text-slate-400">
              YOUR NEXT MOVE
            </p>

            <p className="mt-2 font-semibold text-white">
              Ready for your next opportunity?
            </p>

            <button
              onClick={() => setShowAddApplication(true)}
              className="mt-3 rounded-lg bg-[#F2C94C] px-4 py-2 text-sm font-bold text-[#090D12] transition hover:bg-[#FFD447]"
            >
              + Add Application
            </button>
          </div>

        </header>

        <StatsCards />
        <Analytics />
        <ApplicationsTable />
        {showAddApplication && (
          <AddApplication
            onClose={() => setShowAddApplication(false)}
            onSuccess={handleApplicationAdded}
          />
        )}
      </main>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/applications"
          element={
            <ProtectedRoute>
              <ApplicationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <AnalyticsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <AboutPage />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
