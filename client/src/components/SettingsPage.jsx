
import { useState } from "react";
import Sidebar from "./Sidebar";
import AddApplication from "./AddApplication";

function SettingsPage() {
  const [showAddApplication, setShowAddApplication] = useState(false);

  const handleApplicationAdded = () => {
    window.location.reload();
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#090D12] text-white lg:flex-row">
      <Sidebar onAddApplication={() => setShowAddApplication(true)} />

      <main className="min-w-0 w-full flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl font-bold">
          Settings<span className="text-[#F2C94C]">.</span>
        </h1>

        <p className="mt-2 text-slate-400">
          Manage your account and application preferences.
        </p>

        <div className="mt-8 rounded-2xl border border-white/10 bg-[#0D1219] p-6">
          <h2 className="text-lg font-semibold">Account Settings</h2>
          <p className="mt-2 text-sm text-slate-400">
            Account management options will appear here.
          </p>
        </div>
      </main>

      {showAddApplication && (
        <AddApplication
          onClose={() => setShowAddApplication(false)}
          onSuccess={handleApplicationAdded}
        />
      )}
    </div>
  );
}

export default SettingsPage;
