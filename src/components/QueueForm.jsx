import { useState, useRef } from "react";
import { FaUserPlus } from "react-icons/fa";
import { FiUser, FiSettings } from "react-icons/fi";

export default function QueueForm({ onAddCustomer }) {
  const [customer, setCustomer] = useState("");
  const [service, setService] = useState("");
  const formRef = useRef(null);

  const handleChange = (e) => {
    setCustomer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customer.trim() || !service.trim()) {
      // Add a subtle shake animation for validation
      const form = formRef.current;
      if (form) {
        // Remove the class first to ensure animation retriggers
        form.classList.remove("animate-shake");
        // Use requestAnimationFrame to ensure the browser processes the removal
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // Add the class to trigger animation
            form.classList.add("animate-shake");
            setTimeout(() => {
              form.classList.remove("animate-shake");
            }, 500);
          });
        });
      }
      return;
    }
    onAddCustomer({ customer, service });
    setCustomer("");
    setService("");
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-left text-sm font-medium text-gray-300">
          <div className="flex items-center gap-2 mb-2">
            <FiUser className="text-cyan-400" />
            Customer Name
          </div>
          <input
            type="text"
            value={customer}
            onChange={handleChange}
            placeholder="Enter customer name"
            className="w-full px-4 py-3 bg-slate-900/70 border-2 border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 transition-all duration-300"
            autoFocus
          />
        </label>
      </div>

      <div className="space-y-2">
        <label className="block text-left text-sm font-medium text-gray-300">
          <div className="flex items-center gap-2 mb-2">
            <FiSettings className="text-cyan-400" />
            Service Type
          </div>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full px-4 py-3 bg-slate-900/70 border-2 border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 appearance-none cursor-pointer transition-all duration-300"
          >
            <option value="" className="bg-slate-900 text-gray-400">
              Select a service...
            </option>
            <option value="Consultation" className="bg-slate-900">
              Consultation
            </option>
            <option value="Payment" className="bg-slate-900">
              Payment Processing
            </option>
            <option value="Support" className="bg-slate-900">
              Technical Support
            </option>
            <option value="Installation" className="bg-slate-900">
              Installation
            </option>
            <option value="Maintenance" className="bg-slate-900">
              Maintenance
            </option>
          </select>
        </label>
      </div>

      <button
        type="submit"
        className="w-full group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-cyan-600 hover:to-blue-700 active:scale-95 shadow-xl shadow-cyan-500/25 transition-all duration-300"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        <span className="relative inline-flex items-center justify-center gap-3">
          <FaUserPlus className="text-lg" />
          Add to Queue
        </span>
      </button>

      <div className="pt-4 border-t border-slate-700/50">
        <p className="text-xs text-gray-500 text-center">
          Press Enter to quickly add customers • Use clear, descriptive names
        </p>
      </div>
    </form>
  );
}
