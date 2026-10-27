import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await registerUser(name.trim(), email.trim(), password);

            navigate("/login", {
                replace: true,
                state: {
                    message: "Registration successful! Please sign in.",
                },
            });
        } catch (err) {
            setError(
                err.response?.data?.message ||
                err.message ||
                "Registration failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#090D12] px-4 py-8 text-white">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#131B25] p-6 sm:p-8">
                <img
                    src="/gotham-logo.svg"
                    alt="GOTHAM logo"
                    className="mb-8 h-14 w-auto"
                />

                <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#F2C94C]">
                    Join Gotham
                </p>

                <h1 className="mt-3 text-3xl font-bold">
                    Start your next{" "}
                    <span className="text-[#F2C94C]">move.</span>
                </h1>

                <p className="mt-3 text-sm text-slate-400">
                    Create your account and take control of your career journey.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div>
                        <label
                            htmlFor="name"
                            className="mb-2 block text-sm text-slate-300"
                        >
                            Full name
                        </label>

                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your full name"
                            autoComplete="name"
                            minLength={2}
                            maxLength={80}
                            required
                            className="w-full rounded-xl border border-white/10 bg-[#090D12] px-4 py-3 text-white outline-none transition focus:border-[#F2C94C]"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm text-slate-300"
                        >
                            Email address
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            autoComplete="email"
                            required
                            className="w-full rounded-xl border border-white/10 bg-[#090D12] px-4 py-3 text-white outline-none transition focus:border-[#F2C94C]"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm text-slate-300"
                        >
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Create a password"
                            autoComplete="new-password"
                            minLength={8}
                            required
                            className="w-full rounded-xl border border-white/10 bg-[#090D12] px-4 py-3 text-white outline-none transition focus:border-[#F2C94C]"
                        />

                        <p className="mt-2 text-xs text-slate-500">
                            Use at least 8 characters.
                        </p>
                    </div>

                    {error && (
                        <p role="alert" className="text-sm text-red-400">
                            {error}
                            
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-[#F2C94C] px-4 py-3 font-bold text-[#090D12] transition hover:bg-[#FFD447] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Creating account..." : "Create Account"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-400">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-semibold text-[#F2C94C] transition hover:text-[#FFD447]"
                    >
                        Sign in
                    </Link>
                </p>

                <p className="mt-6 text-center text-xs tracking-wide text-slate-500">
                    YOUR CAREER. YOUR NEXT MOVE.
                </p>
            </div>
        </div>
    );
}

export default Register;