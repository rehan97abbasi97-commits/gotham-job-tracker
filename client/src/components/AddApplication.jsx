
import { useState } from "react";
import { createJob } from "../services/jobService";

function AddApplication({ onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        company: "",
        position: "",
        location: "",
        status: "Applied",
        jobType: "Full-time",
        jobUrl: "",
        notes: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await createJob(formData);
            onSuccess();
            onClose();
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Could not save application. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const inputClass =
        "w-full rounded-lg border border-white/10 bg-[#090D12] px-3 py-3 text-sm text-white outline-none transition focus:border-[#F2C94C]";

    const labelClass = "mb-2 block text-sm text-slate-300";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#131B25] p-6">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold tracking-[0.2em] text-[#F2C94C]">
                            GOTHAM CAREER TRACKER
                        </p>
                        <h2 className="mt-2 text-2xl font-bold text-white">
                            Add Application<span className="text-[#F2C94C]">.</span>
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg px-3 py-2 text-slate-400 hover:bg-white/5 hover:text-white"
                        aria-label="Close form"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className={labelClass} htmlFor="company">
                                Company *
                            </label>
                            <input
                                id="company"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                placeholder="e.g. Google"
                                className={inputClass}
                                required
                            />
                        </div>

                        <div>
                            <label className={labelClass} htmlFor="position">
                                Job Position *
                            </label>
                            <input
                                id="position"
                                name="position"
                                value={formData.position}
                                onChange={handleChange}
                                placeholder="e.g. Frontend Developer"
                                className={inputClass}
                                required
                            />
                        </div>

                        <div>
                            <label className={labelClass} htmlFor="location">
                                Location
                            </label>
                            <input
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="e.g. Jaipur / Remote"
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className={labelClass} htmlFor="status">
                                Application Status
                            </label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className={inputClass}
                            >
                                <option value="Applied">Applied</option>
                                <option value="Interview">Interview</option>
                                <option value="Offer">Offer</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>

                        <div>
                            <label className={labelClass} htmlFor="jobType">
                                Job Type
                            </label>
                            <select
                                id="jobType"
                                name="jobType"
                                value={formData.jobType}
                                onChange={handleChange}
                                className={inputClass}
                            >
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Internship">Internship</option>
                                <option value="Contract">Contract</option>
                            </select>
                        </div>

                        <div>
                            <label className={labelClass} htmlFor="jobUrl">
                                Job Link
                            </label>
                            <input
                                id="jobUrl"
                                name="jobUrl"
                                type="url"
                                value={formData.jobUrl}
                                onChange={handleChange}
                                placeholder="https://..."
                                className={inputClass}
                            />
                        </div>
                    </div>

                    <div>
                        <label className={labelClass} htmlFor="notes">
                            Notes
                        </label>
                        <textarea
                            id="notes"
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            placeholder="Recruiter details, interview date, or reminders..."
                            rows={3}
                            className={inputClass}
                        />
                    </div>

                    {error && (
                        <p
                            role="alert"
                            className="rounded-lg border border-rose-400/20 bg-rose-400/10 p-3 text-sm text-rose-400"
                        >
                            {error}
                        </p>
                    )}

                    <div className="flex justify-end gap-3 border-t border-white/10 pt-5">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-white/10 px-4 py-3 text-sm text-slate-300 hover:bg-white/5"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-lg bg-[#F2C94C] px-5 py-3 text-sm font-bold text-[#090D12] transition hover:bg-[#FFD447] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "Saving..." : "Save Application"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddApplication;
