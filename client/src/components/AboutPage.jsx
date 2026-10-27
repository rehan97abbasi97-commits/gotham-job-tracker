
import Sidebar from "./Sidebar";
import { useState } from "react";
import AddApplication from "./AddApplication";

const features = [
    {
        number: "01",
        title: "Focused & Simple",
        description: "No clutter. Just the tools you need to stay organized.",
        icon: "◎",
    },
    {
        number: "02",
        title: "Data-Driven",
        description: "Understand your application progress with analytics.",
        icon: "▥",
    },
    {
        number: "03",
        title: "Organized Search",
        description: "Keep your opportunities, notes and statuses in one place.",
        icon: "◇",
    },
    {
        number: "04",
        title: "Built for You",
        description: "A focused workspace for your next career opportunity.",
        icon: "↗",
    },
];

function AboutPage() {
    const [showAddApplication, setShowAddApplication] = useState(false);
    return (
        <div className="flex min-h-screen flex-col bg-[#090D12] text-white lg:flex-row">
            <Sidebar onAddApplication={() => setShowAddApplication(true)} />

            <main className="min-w-0 flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-10">
                {/* Hero */}
                <section className="relative isolate overflow-hidden rounded-3xl border border-white/10">
                    <img
                        src="https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1800&q=85"
                        alt="Dramatic night sky over a city"
                        className="absolute inset-0 -z-20 h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#090D12] via-[#090D12]/90 to-[#090D12]/25" />
                    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#090D12]/80 via-transparent to-black/10" />

                    <div className="max-w-3xl px-6 py-16 sm:px-10 sm:py-24 lg:px-14">
                        <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#F2C94C]">
                            About Us · The Mission
                        </p>

                        <h1 className="mt-6 text-4xl font-black leading-tight sm:text-6xl">
                            Welcome to
                            <br />
                            GOTHAM<span className="text-[#F2C94C]">.</span>
                        </h1>

                        <p className="mt-6 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                            Your personal command center for the job hunt. Organize
                            opportunities, track applications, monitor progress, and
                            move toward your next career milestone — all in one place.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <span className="rounded-full border border-[#F2C94C]/30 bg-black/30 px-4 py-2 text-sm text-[#F2C94C]">
                                Built for ambition
                            </span>
                            <span className="rounded-full border border-white/15 bg-black/30 px-4 py-2 text-sm text-slate-200">
                                Designed for clarity
                            </span>
                        </div>
                    </div>
                </section>

                {/* Our Story */}
                <section className="mt-12 grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#F2C94C]">
                            Our Story
                        </p>

                        <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
                            Built for people
                            <br />
                            who keep moving.
                        </h2>

                        <p className="mt-5 leading-7 text-slate-400">
                            Job hunting can quickly become overwhelming. Applications,
                            deadlines, company details and follow-ups can be difficult
                            to manage when everything is scattered.
                        </p>

                        <p className="mt-4 leading-7 text-slate-400">
                            GOTHAM brings your job search into one focused workspace,
                            helping you stay organized and see your progress more clearly.
                        </p>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-2 rounded-3xl border border-[#F2C94C]/30" />
                        <img
                            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85"
                            alt="Modern workspace for focused work"
                            loading="lazy"
                            className="relative h-64 w-full rounded-2xl object-cover sm:h-80"
                        />
                    </div>
                </section>

                {/* Features */}
                <section className="mt-16">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#F2C94C]">
                        What Makes GOTHAM Different?
                    </p>

                    <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                        Everything in one place.
                    </h2>

                    <div className="mt-7 grid gap-4 sm:grid-cols-2">
                        {features.map((feature) => (
                            <article
                                key={feature.number}
                                className="group rounded-2xl border border-white/10 bg-[#0D1219] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#F2C94C]/40"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#F2C94C]/20 bg-[#F2C94C]/10 text-2xl text-[#F2C94C]">
                                        {feature.icon}
                                    </span>

                                    <span className="text-sm font-semibold text-slate-600">
                                        {feature.number}
                                    </span>
                                </div>

                                <h3 className="mt-5 text-lg font-bold group-hover:text-[#F2C94C]">
                                    {feature.title}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-400">
                                    {feature.description}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>

                {/* Mission */}
                <section className="mt-16 overflow-hidden rounded-3xl border border-[#F2C94C]/25 bg-[#0D1219]">
                    <div className="grid lg:grid-cols-2">
                        <div className="p-7 sm:p-10">
                            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#F2C94C]">
                                Our Mission
                            </p>

                            <h2 className="mt-4 text-3xl font-bold">
                                Less chaos.
                                <br />
                                More clarity.
                            </h2>

                            <p className="mt-5 leading-7 text-slate-400">
                                Your next opportunity deserves a clear plan. GOTHAM helps
                                you manage the details so you can focus on preparing for
                                what comes next.
                            </p>

                            <p className="mt-6 font-semibold italic text-[#F2C94C]">
                                Your next chapter starts here.
                            </p>
                        </div>

                        <div className="min-h-64">
                            <img
                                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85"
                                alt="Laptop and developer workspace"
                                loading="lazy"
                                className="h-full min-h-64 w-full object-cover"
                            />
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="mt-12 border-t border-white/10 py-6 text-center">
                    <p className="text-sm text-slate-500">
                        GOTHAM Job Tracker
                        <span className="mx-2 text-[#F2C94C]">·</span>
                        Built for the next chapter.
                    </p>
                </footer>
            </main>
            {showAddApplication && (
                <AddApplication
                    onClose={() => setShowAddApplication(false)}
                    onSuccess={() => window.location.reload()}
                />
            )}
        </div>
    );
}

export default AboutPage;
