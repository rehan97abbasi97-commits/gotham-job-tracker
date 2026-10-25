
import {
    BriefcaseBusiness,
    CalendarCheck,
    Trophy,
    XCircle,
} from "lucide-react";

const stats = [
    {
        label: "Total Applications",
        value: "24",
        change: "All tracked applications",
        icon: BriefcaseBusiness,
        color: "text-[#F2C94C]",
        background: "bg-[#F2C94C]/10",
    },
    {
        label: "Interviews",
        value: "06",
        change: "Opportunities in progress",
        icon: CalendarCheck,
        color: "text-sky-400",
        background: "bg-sky-400/10",
    },
    {
        label: "Offers",
        value: "02",
        change: "Offers received",
        icon: Trophy,
        color: "text-emerald-400",
        background: "bg-emerald-400/10",
    },
    {
        label: "Rejected",
        value: "04",
        change: "Applications declined",
        icon: XCircle,
        color: "text-rose-400",
        background: "bg-rose-400/10",
    },
];

function StatsCards() {
    return (
        <section className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                    <div
                        key={stat.label}
                        className="rounded-2xl border border-white/10 bg-[#131B25] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#F2C94C]/30"
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-400">
                                {stat.label}
                            </p>

                            <div className={`rounded-xl p-3 ${stat.background}`}>
                                <Icon size={20} className={stat.color} />
                            </div>
                        </div>

                        <h2 className="mt-5 text-3xl font-bold tracking-tight">
                            {stat.value}
                        </h2>

                        <p className="mt-2 text-xs text-slate-500">
                            {stat.change}
                        </p>
                    </div>
                );
            })}
        </section>
    );
}

export default StatsCards;
