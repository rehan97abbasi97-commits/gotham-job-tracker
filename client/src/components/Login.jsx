
import { useState } from "react";
import { loginUser } from "../services/authService";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
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
            const data = await loginUser(email, password);

            if (!data.token) {
                throw new Error("Login response did not include a token.");
            }

            localStorage.setItem("token", data.token);
            navigate("/", { replace: true });

            // Dashboard navigation will be added next.
        } catch (err) {
            setError(
                err.response?.data?.message ||
                err.message ||
                "Login failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#090D12] px-4 text-white">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#131B25] p-8">
                <img
                    src="/gotham-logo.svg"
                    alt="GOTHAM logo"
                    className="mb-8 h-14 w-auto"
                />

                <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#F2C94C]">
                    Welcome back
                </p>

                <h1 className="mt-3 text-3xl font-bold">
                    Enter the <span className="text-[#F2C94C]">Gotham.</span>
                </h1>

                <p className="mt-3 text-sm text-slate-400">
                    Sign in to track your next career move.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div>
                        <label htmlFor="email" className="mb-2 block text-sm text-slate-300">
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
                        <label htmlFor="password" className="mb-2 block text-sm text-slate-300">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            required
                            className="w-full rounded-xl border border-white/10 bg-[#090D12] px-4 py-3 text-white outline-none transition focus:border-[#F2C94C]"
                        />
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
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-400">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="font-semibold text-[#F2C94C] transition hover:text-[#FFD447]"
                    >
                        Create account
                    </Link>
                </p>

                <p className="mt-6 text-center text-xs tracking-wide text-slate-500">
                    YOUR CAREER. YOUR NEXT MOVE.
                </p>
            </div>
        </div>
    );
}

export default Login;
