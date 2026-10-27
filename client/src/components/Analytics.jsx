
import { useEffect, useState } from "react";
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";
import { getAllJobs } from "../services/jobService";

const COLORS = ["#38BDF8", "#F2C94C", "#34D399", "#FB7185"];

function Analytics() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        const fetchApplications = async () => {
            try {
                const data = await getAllJobs();

                if (active) {
                    setApplications(data.jobs || []);
                    setError("");
                }
            } catch (err) {
                if (active) {
                    setError("Could not load analytics data.");
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        fetchApplications();

        window.addEventListener("jobs-updated", fetchApplications);

        return () => {
            active = false;
            window.removeEventListener("jobs-updated", fetchApplications);
        };
    }, []);

    const statuses = ["Applied", "Interview", "Offer", "Rejected"];

    const chartData = statuses.map((status) => ({
        name: status,
        value: applications.filter(
            (application) => application.status === status
        ).length,
    }));


    const trendData = Object.values(
        applications.reduce((acc, application) => {
            const rawDate = application.appliedDate || application.createdAt;

            if (!rawDate) return acc;

            const date = new Date(rawDate).toISOString().slice(0, 10);

            if (!acc[date]) {
                acc[date] = { date, applications: 0 };
            }

            acc[date].applications += 1;
            return acc;
        }, {})
    ).sort((a, b) => a.date.localeCompare(b.date));


    if (loading) {
        return (
            <div className="mt-8 rounded-2xl border border-white/10 bg-[#0D1219] p-6 text-slate-400">
                Loading analytics...
            </div>
        );
    }

    if (error) {
        return (
            <div className="mt-8 rounded-2xl border border-white/10 bg-[#0D1219] p-6 text-rose-400">
                {error}
            </div>
        );
    }

    return (
        <section className="mt-8 rounded-2xl border border-white/10 bg-[#0D1219] p-6">
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-[#131B25] p-4">
                    <p className="text-sm text-slate-400">Response Rate</p>
                    <h3 className="mt-2 text-2xl font-bold text-[#F2C94C]">
                        {applications.length > 0
                            ? `${Math.round(
                                (applications.filter((app) =>
                                    ["Interview", "Offer"].includes(app.status)
                                ).length /
                                    applications.length) *
                                100
                            )}%`
                            : "0%"}
                    </h3>
                </div>

                <div className="rounded-xl border border-white/10 bg-[#131B25] p-4">
                    <p className="text-sm text-slate-400">Most Common Status</p>
                    <h3 className="mt-2 text-xl font-bold text-white">
                        {(() => {
                            if (applications.length === 0) return "No data";

                            const statuses = ["Applied", "Interview", "Offer", "Rejected"];

                            const counts = statuses.map((status) => ({
                                status,
                                count: applications.filter((app) => app.status === status).length,
                            }));

                            const maxCount = Math.max(...counts.map((item) => item.count));

                            const topStatuses = counts.filter(
                                (item) => item.count === maxCount
                            );

                            return topStatuses.length > 1 ? "Tie" : topStatuses[0].status;
                        })()}
                    </h3>
                </div>

                <div className="rounded-xl border border-white/10 bg-[#131B25] p-4">
                    <p className="text-sm text-slate-400">
                        Recent Activity (7 Days)
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-white">
                        {
                            applications.filter((app) => {
                                const rawDate = app.appliedDate || app.createdAt;

                                if (!rawDate) return false;

                                const date = new Date(rawDate);
                                const now = new Date();
                                const sevenDaysAgo = new Date();

                                sevenDaysAgo.setDate(now.getDate() - 7);

                                return date >= sevenDaysAgo && date <= now;
                            }).length
                        }
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                        Applications in the last 7 days
                    </p>
                </div>
            </div>
            <div className="mb-6">
                <h2 className="text-lg font-bold">
                    Application Analytics<span className="text-[#F2C94C]">.</span>
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                    Your job search at a glance.
                </p>
            </div>

            <div className="h-80 w-full">
                {applications.length === 0 ? (
                    <div className="flex h-full items-center justify-center text-sm text-slate-400">
                        Add applications to see your analytics.
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData.filter((item) => item.value > 0)}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                paddingAngle={0}
                                label
                            >
                                {chartData
                                    .filter((item) => item.value > 0)
                                    .map((entry) => (
                                        <Cell key={entry.name} fill={COLORS[statuses.indexOf(entry.name)]} />
                                    ))}
                            </Pie>

                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#131B25",
                                    border: "1px solid #334155",
                                    borderRadius: "12px",
                                    color: "#FFFFFF",
                                }}
                            />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                )}
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
                <h3 className="mb-4 text-base font-semibold text-white">
                    Application Trends
                </h3>

                {trendData.length === 0 ? (
                    <p className="py-8 text-center text-sm text-slate-400">
                        No date information available yet.
                    </p>
                ) : (
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={trendData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#26313E" />
                                <XAxis
                                    dataKey="date"
                                    stroke="#94A3B8"
                                    tick={{ fontSize: 11 }}
                                    tickFormatter={(value) =>
                                        new Date(value + "T00:00:00").toLocaleDateString("en-IN", {
                                            day: "2-digit",
                                            month: "short",
                                        })
                                    }
                                />
                                <YAxis
                                    allowDecimals={false}
                                    stroke="#94A3B8"
                                />
                                <Tooltip
                                    labelFormatter={(value) =>
                                        new Date(value + "T00:00:00").toLocaleDateString("en-IN", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })
                                    }
                                    contentStyle={{
                                        backgroundColor: "#131B25",
                                        border: "1px solid #334155",
                                        borderRadius: "12px",
                                        color: "#FFFFFF",
                                    }}
                                />
                                <Bar
                                    dataKey="applications"
                                    name="Applications"
                                    fill="#F2C94C"
                                    radius={[5, 5, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>

        </section>
    );
}

export default Analytics;
