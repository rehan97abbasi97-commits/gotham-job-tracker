
import { useState } from "react";
import Sidebar from "./Sidebar";
import Analytics from "./Analytics";
import AddApplication from "./AddApplication";

function AnalyticsPage() {
  const [showAddApplication, setShowAddApplication] = useState(false);

  const handleApplicationAdded = () => {
    window.location.reload();
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#090D12] text-white lg:flex-row">
      <Sidebar onAddApplication={() => setShowAddApplication(true)} />

      <main className="min-w-0 w-full flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">
        <header>
          <h1 className="text-3xl font-bold">
            Analytics<span className="text-[#F2C94C]">.</span>
          </h1>
          <p className="mt-2 text-slate-400">
            Analyze your job search progress and application trends.
          </p>
        </header>

        <Analytics />
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

export default AnalyticsPage;
