
import Sidebar from "./components/Sidebar";
import StatsCards from "./components/StatsCards";
import ApplicationsTable from "./components/ApplicationsTable";

function App() {
  return (
    <div className="flex min-h-screen bg-[#090D12] text-white">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Dashboard Area */}
      <main className="min-w-0 flex-1 p-8">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400">
              Welcome back
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Dashboard<span className="text-[#F2C94C]">.</span>
            </h1>

            <p className="mt-2 text-slate-400">
              Here's what's happening with your job search.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#131B25] px-4 py-3">
            <p className="text-xs text-slate-500">
              YOUR NEXT MOVE
            </p>
            <p className="mt-1 font-semibold text-[#F2C94C]">
              Starts here.
            </p>
          </div>
        </header>

        {/* Dashboard Statistics */}
        <StatsCards />
        <ApplicationsTable />
      </main>
    </div>
  );
}

export default App;
