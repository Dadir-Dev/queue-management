import { FiUsers, FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../context/useTheme";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`relative inline-flex h-11 w-21 shrink-0 items-center rounded-full p-1 shadow-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/80 focus-visible:ring-offset-2 ${
        isDark
          ? "bg-linear-to-r from-slate-800 to-slate-900 ring-1 ring-white/15 focus-visible:ring-offset-slate-900"
          : "bg-linear-to-r from-indigo-100 to-violet-100 ring-1 ring-indigo-200/80 focus-visible:ring-offset-white"
      }`}
    >
      <span
        className={`pointer-events-none absolute left-1 top-1 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br shadow-md transition-transform duration-300 ease-out ${
          isDark
            ? "translate-x-0 from-indigo-500 to-purple-600 text-white"
            : "translate-x-10 from-amber-400 to-orange-400 text-white"
        }`}
      >
        {isDark ? (
          <FiMoon className="text-lg" aria-hidden />
        ) : (
          <FiSun className="text-lg" aria-hidden />
        )}
      </span>
      <span
        className={`flex w-full justify-between px-2 text-xs font-semibold ${
          isDark ? "text-slate-400" : "text-indigo-600/90"
        }`}
      >
        <span
          className={`flex flex-1 items-center justify-center gap-0.5 ${
            isDark ? "text-amber-300/90" : "opacity-40"
          }`}
        >
          <FiSun className="text-sm" aria-hidden />
        </span>
        <span
          className={`flex flex-1 items-center justify-center gap-0.5 ${
            isDark ? "opacity-40" : "text-indigo-700/90"
          }`}
        >
          <FiMoon className="text-sm" aria-hidden />
        </span>
      </span>
    </button>
  );
}

export default function Header({
  totalInQueue,
  waitingCount,
  servingCount,
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header
      className={`relative mb-10 text-center md:mb-16 ${
        isDark ? "text-white" : "text-slate-900"
      }`}
    >
      <div className="mb-6 flex justify-center md:absolute md:right-0 md:top-0 md:mb-0 md:justify-end">
        <ThemeToggle />
      </div>

      <div className="inline-flex items-center justify-center rounded-2xl bg-linear-to-r from-indigo-500 to-purple-600 p-3 shadow-xl">
        <FiUsers className="mr-3 text-3xl text-white" />
        <h1
          className={`bg-linear-to-r bg-clip-text text-3xl font-bold text-transparent md:text-4xl ${
            isDark ? "from-white to-blue-200" : "from-white to-indigo-100"
          }`}
        >
          QueueFlow Pro
        </h1>
      </div>
      <p
        className={`mx-auto mt-6 max-w-2xl text-lg md:text-xl ${
          isDark ? "text-gray-300" : "text-slate-600"
        }`}
      >
        Streamline customer management with real-time tracking and smart queue
        optimization
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <div
          className={`min-w-[140px] rounded-xl p-4 shadow-lg backdrop-blur-sm ${
            isDark
              ? "border border-white/20 bg-white/10"
              : "border border-indigo-100/80 bg-white/90 shadow-indigo-100/50"
          }`}
        >
          <div
            className={`text-2xl font-bold ${
              isDark ? "text-cyan-300" : "text-cyan-600"
            }`}
          >
            {totalInQueue}
          </div>
          <div className={`text-sm ${isDark ? "text-gray-300" : "text-slate-500"}`}>
            Total in Queue
          </div>
        </div>
        <div
          className={`min-w-[140px] rounded-xl p-4 shadow-lg backdrop-blur-sm ${
            isDark
              ? "border border-white/20 bg-white/10"
              : "border border-indigo-100/80 bg-white/90 shadow-indigo-100/50"
          }`}
        >
          <div
            className={`text-2xl font-bold ${
              isDark ? "text-amber-300" : "text-amber-600"
            }`}
          >
            {waitingCount}
          </div>
          <div className={`text-sm ${isDark ? "text-gray-300" : "text-slate-500"}`}>
            Waiting
          </div>
        </div>
        <div
          className={`min-w-[140px] rounded-xl p-4 shadow-lg backdrop-blur-sm ${
            isDark
              ? "border border-white/20 bg-white/10"
              : "border border-indigo-100/80 bg-white/90 shadow-indigo-100/50"
          }`}
        >
          <div
            className={`text-2xl font-bold ${
              isDark ? "text-emerald-300" : "text-emerald-600"
            }`}
          >
            {servingCount}
          </div>
          <div className={`text-sm ${isDark ? "text-gray-300" : "text-slate-500"}`}>
            Being Served
          </div>
        </div>
      </div>
    </header>
  );
}
