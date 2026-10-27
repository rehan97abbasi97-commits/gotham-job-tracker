
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  ChartNoAxesColumn,
  Settings,
  Plus,
  LogOut,
  Info,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "My Applications", icon: BriefcaseBusiness, path: "/applications" },
  { label: "Analytics", icon: ChartNoAxesColumn, path: "/analytics" },
  { label: "Settings", icon: Settings, path: "/settings" },
  { label: "About Us", icon: Info, path: "/about" },
];

function Sidebar({ onAddApplication }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <aside className="relative flex w-full shrink-0 flex-col border-b border-white/[0.08] bg-[#0D1219] p-4 sm:p-5 lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:border-r lg:border-b-0">
      {/* Brand */}
      <button
        onClick={() => navigate("/")}
        className="group mb-8 flex w-fit items-center gap-3 rounded-xl transition duration-300 hover:opacity-80"
      >
        <img
          src="/gotham-logo.svg"
          alt="GOTHAM"
          className="h-10 w-auto transition duration-300 group-hover:scale-105"
        />
      </button>

      {/* Workspace label */}
      <div className="mb-4 flex items-center justify-between px-3">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">
          Workspace
        </p>
        <span className="h-1.5 w-1.5 rounded-full bg-[#F2C94C] shadow-[0_0_8px_#F2C94C]" />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1.5">
        {navItems.map(({ label, icon: Icon, path }) => {
          const isActive =
            path === "/"
              ? location.pathname === "/"
              : location.pathname === path ||
                location.pathname.startsWith(`${path}/`);

          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              aria-current={isActive ? "page" : undefined}
              className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "border-[#F2C94C]/20 bg-[#F2C94C]/[0.09] text-[#F2C94C] shadow-[inset_3px_0_0_#F2C94C]"
                  : "border-transparent text-slate-400 hover:border-white/[0.06] hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              <Icon
                size={18}
                strokeWidth={isActive ? 2.2 : 1.8}
                className={`shrink-0 transition-transform duration-200 ${
                  isActive
                    ? "text-[#F2C94C]"
                    : "group-hover:scale-110 group-hover:text-[#F2C94C]"
                }`}
              />

              <span className="flex-1">{label}</span>

              {isActive && (
                <ChevronRight size={15} className="text-[#F2C94C]/80" />
              )}
            </button>
          );
        })}

        {/* Add Application */}
        <button
          onClick={onAddApplication}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#F2C94C] px-4 py-3 text-sm font-bold text-[#090D12] shadow-[0_4px_18px_rgba(242,201,76,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#FFD447] hover:shadow-[0_6px_22px_rgba(242,201,76,0.18)] active:translate-y-0"
        >
          <Plus size={18} strokeWidth={2.5} />
          Add Application
        </button>
      </nav>

      {/* Footer */}
      <div className="mt-8 border-t border-white/[0.08] pt-5 lg:mt-auto lg:pt-5">
        <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-3">
          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">
            Your career. Your next move.
          </p>
          <p className="mt-2 text-sm font-semibold text-white">
            GOTHAM <span className="text-[#F2C94C]">Workspace</span>
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="mt-3 flex w-full items-center gap-3 rounded-xl border border-transparent px-4 py-3 text-sm font-medium text-slate-400 transition-all duration-200 hover:border-rose-500/10 hover:bg-rose-500/[0.08] hover:text-rose-400"
        >
          <LogOut size={18} />
          Logout
        </button>

        <p className="mt-3 text-center text-[10px] text-slate-600">
          GOTHAM JOB TRACKER · v1.0
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;
