
import Sidebar from "./Sidebar";
import { useState } from "react";
import AddApplication from "./AddApplication";
import ApplicationsTable from "./ApplicationsTable";

function ApplicationsPage() {
    const [showAddApplication, setShowAddApplication] = useState(false);

    const handleApplicationAdded = () => {
        window.location.reload();
    };
    return (
        <div className="flex min-h-screen flex-col bg-[#090D12] text-white lg:flex-row">
            <Sidebar onAddApplication={() => setShowAddApplication(true)} />

            <main className="min-w-0 w-full flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">
                <h1 className="text-3xl font-bold">
                    My Applications<span className="text-[#F2C94C]">.</span>
                </h1>

                <p className="mt-2 text-slate-400">
                    Track and manage all your job applications.
                </p>
                <ApplicationsTable />

                {showAddApplication && (
                    <AddApplication
                        onClose={() => setShowAddApplication(false)}
                        onSuccess={handleApplicationAdded}
                    />
                )}
            </main>
        </div>
    );
}

export default ApplicationsPage;
