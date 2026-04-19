import "./App.css";
import { useState, useEffect } from "react";
import QueueForm from "./components/QueueForm";
import QueueDisplay from "./components/QueueDisplay";
import { FiUsers, FiTrendingUp } from "react-icons/fi";

export default function App() {
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

  return (
    <div className="App min-h-screen bg-linear-to-br from-slate-900 via-slate-900 to-indigo-900 p-4 md:p-8 text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <header className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-linear-to-r from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-xl">
            <FiUsers className="text-3xl mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-blue-200">
              QueueFlow Pro
            </h1>
          </div>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Streamline customer management with real-time tracking and smart
            queue optimization
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 min-w-[140px] border border-white/20 shadow-lg">
              <div className="text-2xl font-bold text-cyan-300">
                {queue.length}
              </div>
              <div className="text-sm text-gray-300">Total in Queue</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 min-w-[140px] border border-white/20 shadow-lg">
              <div className="text-2xl font-bold text-amber-300">
                {waitingCount}
              </div>
              <div className="text-sm text-gray-300">Waiting</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 min-w-[140px] border border-white/20 shadow-lg">
              <div className="text-2xl font-bold text-emerald-300">
                {servingCount}
              </div>
              <div className="text-sm text-gray-300">Being Served</div>
            </div>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-linear-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-linear-to-r from-indigo-500 to-purple-600 rounded-lg">
                  <FiTrendingUp className="text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Add New Customer
                </h2>
              </div>
              <QueueForm onAddCustomer={addToQueue} />
            </div>

            {/* Instructions Card */}
            <div className="bg-linear-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-2xl">
              <h3 className="text-lg font-semibold mb-3 text-cyan-300">
                How to Use
              </h3>
              <ul className="space-y-2 text-sm text-gray-300 text-left">
                <li className="flex items-start gap-2">
                  <span className="inline-block w-2 h-2 bg-cyan-500 rounded-full mt-1.5"></span>
                  Add customers with their required service
                </li>
                <li className="flex items-start gap-2">
                  <span className="inline-block w-2 h-2 bg-cyan-500 rounded-full mt-1.5"></span>
                  Click "Serve" when starting service
                </li>
                <li className="flex items-start gap-2">
                  <span className="inline-block w-2 h-2 bg-cyan-500 rounded-full mt-1.5"></span>
                  Mark as "Complete" when finished
                </li>
                <li className="flex items-start gap-2">
                  <span className="inline-block w-2 h-2 bg-cyan-500 rounded-full mt-1.5"></span>
                  Remove customers from queue as needed
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-linear-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-2xl h-fit">
            <QueueDisplay
              queueList={queue}
              onUpdateStatus={updateStatus}
              onRemoveFromQueue={removeFromQueue}
            />
          </div>
        </main>

        <footer className="mt-12 pt-6 border-t border-slate-700/50 text-center text-gray-400 text-sm">
          <p>
            QueueFlow Pro • Modern Queue Management System • Built with React &
            Tailwind CSS
          </p>
          <p className="mt-2">
            Optimize your customer flow with real-time tracking
          </p>
        </footer>
      </div>
    </div>
  );
}
