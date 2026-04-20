import { useState, useRef } from "react";
import { FaUserPlus } from "react-icons/fa";
import { FiUser, FiSettings } from "react-icons/fi";
import { useTheme } from "../context/useTheme";

export default function QueueForm({ onAddCustomer }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [customer, setCustomer] = useState("");
  const [service, setService] = useState("");
  const formRef = useRef(null);

  const handleChange = (e) => {
    setCustomer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customer.trim() || !service.trim()) {
      const form = formRef.current;
      if (form) {
        form.classList.remove("animate-shake");
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
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

  const labelClass = isDark
    ? "block text-left text-sm font-medium text-gray-300"
    : "block text-left text-sm font-medium text-slate-700";

  const iconAccentClass = isDark ? "text-cyan-400" : "text-cyan-600";

  const inputClass = isDark
    ? "w-full rounded-xl border-2 border-slate-700 bg-slate-900/70 px-4 py-3 text-white placeholder-gray-500 transition-all duration-300 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
    : "w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition-all duration-300 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/25";

  const selectOptionMutedClass = isDark
    ? "bg-slate-900 text-gray-400"
    : "bg-white text-slate-500";

  const selectOptionClass = isDark ? "bg-slate-900" : "bg-white";

  const footerBorderClass = isDark ? "border-slate-700/50" : "border-slate-200";

  const footerHintClass = isDark ? "text-xs text-center text-gray-500" : "text-xs text-center text-slate-500";

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className={labelClass}>
          <div className="mb-2 flex items-center gap-2">
            <FiUser className={iconAccentClass} />
            Customer Name
          </div>
          <input
            type="text"
            value={customer}
            onChange={handleChange}
            placeholder="Enter customer name"
            className={inputClass}
            autoFocus
          />
        </label>
      </div>

      <div className="space-y-2">
        <label className={labelClass}>
          <div className="mb-2 flex items-center gap-2">
            <FiSettings className={iconAccentClass} />
            Service Type
          </div>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className={inputClass}
          >
            <option value="" className={selectOptionMutedClass}>
              Select a service...
            </option>
            <option value="Consultation" className={selectOptionClass}>
              Consultation
            </option>
            <option value="Payment" className={selectOptionClass}>
              Payment Processing
            </option>
            <option value="Support" className={selectOptionClass}>
              Technical Support
            </option>
            <option value="Installation" className={selectOptionClass}>
              Installation
            </option>
            <option value="Maintenance" className={selectOptionClass}>
              Maintenance
            </option>
          </select>
        </label>
      </div>

      <button
        type="submit"
        className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-xl shadow-cyan-500/25 transition-all duration-300 hover:from-cyan-600 hover:to-blue-700 active:scale-95"
      >
        <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]"></div>
        <span className="relative inline-flex items-center justify-center gap-3">
          <FaUserPlus className="text-lg" />
          Add to Queue
        </span>
      </button>

      <div className={`border-t pt-4 ${footerBorderClass}`}>
        <p className={footerHintClass}>
          Press Enter to quickly add customers • Use clear, descriptive names
        </p>
      </div>
    </form>
  );
}
