
import { ArrowUpRight, Search, SlidersHorizontal } from "lucide-react";

const applications = [
    {
        company: "Google",
        role: "Frontend Developer",
        date: "Oct 21, 2026",
        status: "Interview",
        initials: "G",
    },
    {
        company: "Microsoft",
        role: "React Developer",
        date: "Oct 19, 2026",
        status: "Applied",
        initials: "M",
    },
    {
        company: "Razorpay",
        role: "Full Stack Developer",
        date: "Oct 17, 2026",
        status: "Offer",
        initials: "R",
    },
    {
        company: "Amazon",
        role: "Software Engineer",
        date: "Oct 15, 2026",
        status: "Rejected",
        initials: "A",
    },
];

const statusStyles = {
    Applied: "bg-sky-400/10 text-sky-400",
    Interview: "bg-amber-400/10 text-amber-400",
    Offer: "bg-emerald-400/10 text-emerald-400",
    Rejected: "bg-rose-400/10 text-rose-400",
};

function ApplicationsTable() {
    return (
        <section className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0D1219]">
            {/* Table Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 p-6">
                <div>
                    <h2 className="text-lg font-bold">Recent Applications</h2>
                    <p className="mt-1 text-sm text-slate-400">
                        Keep track of your latest opportunities.
                    </p>
                </div>

                <button className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-300 transition hover:border-[#F2C94C]/40">
                    <SlidersHorizontal size={16} />
                    Filters
                </button>
            </div>

            {/* Search */}
            <div className="border-b border-white/10 p-5">
                <div className="flex max-w-sm items-center gap-3 rounded-lg border border-white/10 bg-[#131B25] px-3 py-2.5">
                    <Search size={17} className="text-slate-500" />

                    <input
                        type="text"
                        placeholder="Search applications..."
                        className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                    />
                </div>
            </div>

            {/* Applications */}
            <div className="overflow-x-auto">
                <table className="w-full min-w-[650px] text-left">
                    <thead className="bg-white/[0.02] text-xs uppercase tracking-wider text-slate-500">
                        <tr>
                            <th className="px-6 py-4 font-medium">Company & Role</th>
                            <th className="px-6 py-4 font-medium">Applied Date</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 text-right font-medium">Details</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-white/5">
                        {applications.map((application) => (
                            <tr
                                key={application.company}
                                className="transition hover:bg-white/[0.03]"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#F2C94C]/20 bg-[#F2C94C]/10 font-bold text-[#F2C94C]">
                                            {application.initials}
                                        </div>

                                        <div>
                                            <p className="font-semibold text-white">
                                                {application.company}
                                            </p>
                                            <p className="mt-1 text-xs text-slate-400">
                                                {application.role}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4 text-sm text-slate-400">
                                    {application.date}
                                </td>

                                <td className="px-6 py-4">
                                    <span
                                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[application.status]}`}
                                    >
                                        {application.status}
                                    </span>
                                </td>

                                <td className="px-6 py-4 text-right">
                                    <button
                                        aria-label={`View ${application.company} application`}
                                        className="rounded-lg p-2 text-slate-400 transition hover:bg-[#F2C94C]/10 hover:text-[#F2C94C]"
                                    >
                                        <ArrowUpRight size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="border-t border-white/10 px-6 py-4 text-xs text-slate-500">
                Showing 4 sample applications
            </div>
        </section>
    );
}

export default ApplicationsTable;
