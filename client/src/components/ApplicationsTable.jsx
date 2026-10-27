
import { useEffect, useState } from "react";
import { ArrowUpRight, Search, SlidersHorizontal, Pencil, Trash2 } from "lucide-react";
import { getAllJobs } from "../services/jobService";

import EditApplication from "./EditApplication";
import { deleteJob } from "../services/jobService";


const statusStyles = {
    Applied: "bg-sky-400/10 text-sky-400",
    Interview: "bg-amber-400/10 text-amber-400",
    Offer: "bg-emerald-400/10 text-emerald-400",
    Rejected: "bg-rose-400/10 text-rose-400",
};

function ApplicationsTable() {
    const [applications, setApplications] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [jobTypeFilter, setJobTypeFilter] = useState("All");
    const [showFilters, setShowFilters] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editingApplication, setEditingApplication] = useState(null);
    const [deletingId, setDeletingId] = useState("");
    const [actionError, setActionError] = useState("");

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const data = await getAllJobs();
                setApplications(data.jobs || []);
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    "Could not load applications. Please try again."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    const handleDelete = async (jobId, company) => {
        const confirmed = window.confirm(
            `Delete ${company} application? This cannot be undone.`
        );

        if (!confirmed) return;

        try {
            setActionError("");
            setDeletingId(jobId);

            await deleteJob(jobId);

            setApplications((prev) =>

                prev.filter((application) => application._id !== jobId)
            );
            window.dispatchEvent(new Event("jobs-updated"));
        } catch (err) {
            setActionError(
                err.response?.data?.message || "Could not delete application."
            );
        } finally {
            setDeletingId("");
        }
    };

    const filteredApplications = applications.filter((application) => {
        const query = search.toLowerCase();

        const matchesSearch =
            (application.company || "").toLowerCase().includes(query) ||
            (application.position || "").toLowerCase().includes(query);

        const matchesStatus =
            statusFilter === "All" || application.status === statusFilter;

        const matchesJobType =
            jobTypeFilter === "All" ||
            application.jobType === jobTypeFilter;

        return matchesSearch && matchesStatus && matchesJobType;
    });

    return (
        <section className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0D1219]">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 p-6">
                <div>
                    <h2 className="text-lg font-bold">My Applications</h2>
                    <p className="mt-1 text-sm text-slate-400">
                        Keep track of your latest opportunities.
                    </p>
                </div>

                <button
                    onClick={() => setShowFilters(!showFilters)}
                    type="button"
                    className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-300 transition hover:border-[#F2C94C]/40"
                >
                    <SlidersHorizontal size={16} />
                    Filters
                </button>
            </div>

            <div className="border-b border-white/10 p-5">
                <div className="flex flex-wrap items-center gap-4 border-b border-white/10 p-5">
                    <div className="flex max-w-sm flex-1 items-center gap-3 rounded-lg border border-white/10 bg-[#131B25] px-3 py-2.5">
                        <Search size={17} className="text-slate-500" />
                        <input
                            type="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search applications..."
                            aria-label="Search applications"
                            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                        />
                    </div>

                    {showFilters && (
                        <>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                aria-label="Filter applications by status"
                                className="rounded-lg border border-white/10 bg-[#131B25] px-4 py-2.5 text-sm text-white outline-none focus:border-[#F2C94C]/50"
                            >
                                <option value="All">All Statuses</option>
                                <option value="Applied">Applied</option>
                                <option value="Interview">Interview</option>
                                <option value="Offer">Offer</option>
                                <option value="Rejected">Rejected</option>
                            </select>

                            <select
                                value={jobTypeFilter}
                                onChange={(e) => setJobTypeFilter(e.target.value)}
                                aria-label="Filter applications by job type"
                                className="rounded-lg border border-white/10 bg-[#131B25] px-4 py-2.5 text-sm text-white outline-none focus:border-[#F2C94C]/50"
                            >
                                <option value="All">All Types</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Internship">Internship</option>
                                <option value="Contract">Contract</option>
                            </select>
                        </>
                    )}
                </div>
            </div>

            <div className="w-full max-w-full overflow-x-auto">
                <table className="w-full min-w-[650px] text-left">
                    <thead className="bg-white/[0.02] text-xs uppercase tracking-wider text-slate-500">
                        <tr>
                            <th className="px-3 py-3 font-medium sm:px-6 sm:py-4">
                                Company &amp; Role
                            </th>
                            <th className="px-3 py-3 font-medium sm:px-6 sm:py-4">
                                Applied Date
                            </th>
                            <th className="px-3 py-3 font-medium sm:px-6 sm:py-4">
                                Status
                            </th>
                            <th className="px-3 py-3 text-right font-medium sm:px-6 sm:py-4">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-white/5">
                        {loading ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-10 text-center text-slate-400">
                                    Loading applications...
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan="4" role="alert" className="px-6 py-10 text-center text-rose-400">
                                    {error}
                                </td>
                            </tr>
                        ) : filteredApplications.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-10 text-center text-slate-400">
                                    {search
                                        ? "No applications match your search."
                                        : "No applications yet. Add your first job application!"}
                                </td>
                            </tr>
                        ) : (
                            filteredApplications.map((application) => {
                                const company = application.company || "Unknown company";
                                const role = application.position || "Role not specified";
                                const status = application.status || "Applied";
                                const date = application.appliedDate || application.createdAt;

                                return (
                                    <tr
                                        key={application._id}
                                        className="transition hover:bg-white/[0.03]"
                                    >
                                        <td className="px-3 py-3 sm:px-6 sm:py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#F2C94C]/20 bg-[#F2C94C]/10 font-bold text-[#F2C94C]">
                                                    {company.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-white">{company}</p>
                                                    <p className="mt-1 text-xs text-slate-400">{role}</p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-3 py-3 text-sm text-slate-400 sm:px-6 sm:py-4">
                                            {date
                                                ? new Date(date).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "2-digit",
                                                    year: "numeric",
                                                })
                                                : "—"}
                                        </td>

                                        <td className="px-3 py-3 sm:px-6 sm:py-4">
                                            <span
                                                className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[status] || "bg-slate-400/10 text-slate-400"
                                                    }`}
                                            >
                                                {status}
                                            </span>
                                        </td>

                                        <td className="px-3 py-3 text-right sm:px-6 sm:py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setEditingApplication(application)}
                                                    aria-label={`Edit ${company} application`}
                                                    className="rounded-lg p-2 text-slate-400 transition hover:bg-[#F2C94C]/10 hover:text-[#F2C94C]"
                                                >
                                                    <Pencil size={17} />
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(application._id, company)}
                                                    disabled={deletingId === application._id}
                                                    aria-label={`Delete ${company} application`}
                                                    className="rounded-lg p-2 text-slate-400 transition hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
                                                >
                                                    <Trash2 size={17} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            <div className="border-t border-white/10 px-6 py-4 text-xs text-slate-500">
                {loading
                    ? "Fetching your applications..."
                    : `${filteredApplications.length} application${filteredApplications.length === 1 ? "" : "s"
                    }`}
            </div>

            {editingApplication && (
                <EditApplication
                    application={editingApplication}
                    onClose={() => setEditingApplication(null)}
                    onSuccess={() => {
                        setEditingApplication(null);
                        window.dispatchEvent(new Event("jobs-updated"));
                    }}
                />
            )}
        </section>
    );
}

export default ApplicationsTable;
