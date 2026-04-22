import "./App.css";
import { useState, useEffect } from "react";
import QueueForm from "./components/QueueForm";
import QueueDisplay from "./components/QueueDisplay";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { FiTrendingUp } from "react-icons/fi";
import { useTheme } from "./context/useTheme";

export default function App() {
  // ... (Keep state logic the same)
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [queue, setQueue] = useState(() => {
    try {
      const savedQueue = localStorage.getItem("customers-queue");
      return savedQueue ? JSON.parse(savedQueue) : [];
    } catch (error) {
      console.error("Failed to load queue from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("customers-queue", JSON.stringify(queue));
    } catch (error) {
      console.error("Failed to save queue to localStorage", error);
    }
  }, [queue]);

  const addToQueue = (customerData) => {
    setQueue((prevQueue) => {
      const nextQueue = [
        ...prevQueue,
        {
          ...customerData,
          id: Date.now(),
          status: "waiting",
          timestamp: new Date(),
        },
      ];

      return nextQueue;
    });
  };

  const removeFromQueue = (id) =>
    setQueue((prevQueue) => prevQueue.filter((customer) => customer.id !== id));

  const updateStatus = (id, newStatus) =>
    setQueue((prev) =>
      prev.map((customer) =>
        customer.id === id ? { ...customer, status: newStatus } : customer,
      ),
    );

  const waitingCount = queue.filter((item) => item.status === "waiting").length;
  const servingCount = queue.filter((item) => item.status === "serving").length;

  const shellClass = isDark
    ? "App min-h-screen bg-linear-to-br from-slate-900 via-slate-900 to-indigo-900 p-3 md:p-5 lg:p-8 text-white"
    : "App min-h-screen bg-linear-to-br from-slate-100 via-white to-indigo-50 p-3 md:p-5 lg:p-8 text-slate-900";

  const orbTopClass = isDark // ... (Keep orb classes the same)
    ? "absolute -top-40 -right-40 h-80 w-80 animate-pulse rounded-full bg-purple-500 opacity-10 mix-blend-multiply blur-3xl filter"
    : "absolute -top-40 -right-40 h-80 w-80 animate-pulse rounded-full bg-purple-400 opacity-25 mix-blend-multiply blur-3xl filter";

  const orbBottomClass = isDark // ... (Keep orb classes the same)
    ? "absolute -bottom-40 -left-40 h-80 w-80 animate-pulse rounded-full bg-blue-500 opacity-10 mix-blend-multiply blur-3xl filter delay-1000"
    : "absolute -bottom-40 -left-40 h-80 w-80 animate-pulse rounded-full bg-indigo-400 opacity-20 mix-blend-multiply blur-3xl filter delay-1000";

  const cardClass = isDark
    ? "rounded-2xl border border-slate-700/50 bg-linear-to-br from-slate-800/50 to-slate-900/50 p-4 lg:p-6 shadow-2xl backdrop-blur-sm"
    : "rounded-2xl border border-slate-200/90 bg-linear-to-br from-white to-slate-50/90 p-4 lg:p-6 shadow-xl shadow-indigo-100/40 backdrop-blur-sm";

  const sectionTitleClass = isDark
    ? "text-xl lg:text-2xl font-bold text-white"
    : "text-xl lg:text-2xl font-bold text-slate-900";

  const instructionsHeadingClass = isDark
    ? "mb-2 lg:mb-3 text-base lg:text-lg font-semibold text-cyan-300"
    : "mb-2 lg:mb-3 text-base lg:text-lg font-semibold text-cyan-700";

  const instructionsListClass = isDark
    ? "space-y-1.5 lg:space-y-2 text-left text-xs lg:text-sm text-gray-300"
    : "space-y-1.5 lg:space-y-2 text-left text-xs lg:text-sm text-slate-600";

  return (
    <div className={shellClass}>
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className={orbTopClass}></div>
        <div className={orbBottomClass}></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <Header
          totalInQueue={queue.length}
          waitingCount={waitingCount}
          servingCount={servingCount}
        />

        {/* Reduced main grid gap for mobile */}
        <main className="grid grid-cols-1 gap-4 lg:gap-8 lg:grid-cols-2">
          {/* Reduced vertical space between cards on mobile */}
          <div className="space-y-4 lg:space-y-6">
            <div className={cardClass}>
              <div className="mb-4 lg:mb-6 flex items-center gap-2 lg:gap-3">
                <div className="rounded-lg bg-linear-to-r from-indigo-500 to-purple-600 p-1.5 lg:p-2 text-white">
                  <FiTrendingUp className="text-lg lg:text-xl" />
                </div>
                <h2 className={sectionTitleClass}>Add New Customer</h2>
              </div>
              <QueueForm onAddCustomer={addToQueue} />
            </div>

            <div className={cardClass}>
              <h3 className={instructionsHeadingClass}>How to Use</h3>
              <ul className={instructionsListClass}>
                <li className="flex items-start gap-2">
                  <span className="mt-1 lg:mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full bg-cyan-500"></span>
                  Add customers with their required service
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 lg:mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full bg-cyan-500"></span>
                  Click &quot;Serve&quot; when starting service
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 lg:mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full bg-cyan-500"></span>
                  Mark as &quot;Complete&quot; when finished
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 lg:mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full bg-cyan-500"></span>
                  Remove customers from queue as needed
                </li>
              </ul>
            </div>
          </div>

          <div className={`${cardClass} h-fit`}>
            <QueueDisplay
              queueList={queue}
              onUpdateStatus={updateStatus}
              onRemoveFromQueue={removeFromQueue}
            />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
