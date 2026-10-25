
import {
    LayoutDashboard,
    BriefcaseBusiness,
    ChartNoAxesColumn,
    Settings,
    Plus,
} from "lucide-react";

const navItems = [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "My Applications", icon: BriefcaseBusiness },
    { label: "Analytics", icon: ChartNoAxesColumn },
    { label: "Settings", icon: Settings },
];

function Sidebar() {
    return (
        <aside className="flex min-h-screen w-64 flex-col border-r border-white/10 bg-[#0D1219] p-5">
            {/* Brand */}
            <div className="mb-10 flex items-center gap-3">
                <img
                    src="/gotham-logo.svg"
                    alt="GOTHAM"
                    className="h-10 w-auto"
                />
            </div>

            {/* Navigation */}
            <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Workspace
            </p>

            <nav className="flex-1 space-y-2">
                {navItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = index === 0;

                    return (
                        <button
                            key={item.label}
                            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${isActive
                                    ? "border border-[#F2C94C]/20 bg-[#F2C94C]/10 text-[#F2C94C]"
                                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            <Icon size={19} />
                            {item.label}
                        </button>
                    );
                })}

                <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#F2C94C] px-4 py-3 text-sm font-bold text-[#090D12] transition hover:bg-[#FFD447]">
                    <Plus size={18} />
                    Add Application
                </button>
            </nav>

            {/* Footer */}
            <div className="mt-8 border-t border-white/10 pt-5">
                <p className="text-xs text-slate-500">YOUR CAREER. YOUR NEXT MOVE.</p>
                <p className="mt-2 text-sm font-semibold text-white">GOTHAM Workspace</p>
            </div>
        </aside>
    );
}

export default Sidebar;
