import { useTheme } from "../context/useTheme";

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <footer
      className={`mt-12 border-t pt-6 text-center text-sm ${
        isDark ?
          "border-slate-700/50 text-gray-400"
        : "border-slate-200 text-slate-500"
      }`}
    >
      <p>
        QueueFlow Pro • Modern Queue Management System • Built by{" "}
        <a
          href="https://github.com/Dadir-Dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-500 hover:text-cyan-400"
        >
          Dadir Dev
        </a>
      </p>
      <p className="mt-2">
        Optimize your customer flow with real-time tracking
      </p>
    </footer>
  );
}
