import { FiClock, FiCheckCircle, FiUser, FiLoader } from "react-icons/fi";
import { MdOutlineSupportAgent } from "react-icons/md";
import { useTheme } from "../context/useTheme";

function QueueDisplay({ queueList, onUpdateStatus, onRemoveFromQueue }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const getStatusConfig = (status) => {
    if (isDark) {
      const configs = {
        waiting: {
          color: "bg-amber-500/20",
          textColor: "text-amber-300",
          borderColor: "border-amber-500/30",
          icon: FiClock,
          label: "Waiting",
          gradient: "from-amber-500/10 to-amber-600/5",
        },
        serving: {
          color: "bg-emerald-500/20",
          textColor: "text-emerald-300",
          borderColor: "border-emerald-500/30",
          icon: FiLoader,
          label: "Serving",
          gradient: "from-emerald-500/10 to-emerald-600/5",
        },
        completed: {
          color: "bg-blue-500/20",
          textColor: "text-blue-300",
          borderColor: "border-blue-500/30",
          icon: FiCheckCircle,
          label: "Completed",
          gradient: "from-blue-500/10 to-blue-600/5",
        },
      };
      return configs[status] || configs.waiting;
    }

    const configs = {
      waiting: {
        color: "bg-amber-100",
        textColor: "text-amber-800",
        borderColor: "border-amber-200",
        icon: FiClock,
        label: "Waiting",
        gradient: "from-amber-50 to-amber-100/80",
      },
      serving: {
        color: "bg-emerald-100",
        textColor: "text-emerald-800",
        borderColor: "border-emerald-200",
        icon: FiLoader,
        label: "Serving",
        gradient: "from-emerald-50 to-emerald-100/80",
      },
      completed: {
        color: "bg-blue-100",
        textColor: "text-blue-800",
        borderColor: "border-blue-200",
        icon: FiCheckCircle,
        label: "Completed",
        gradient: "from-blue-50 to-blue-100/80",
      },
    };
    return configs[status] || configs.waiting;
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const titleClass = isDark ? "text-2xl font-bold text-white" : "text-2xl font-bold text-slate-900";
  const subtitleClass = isDark ? "text-sm text-gray-400" : "text-sm text-slate-600";
  const totalBadgeClass = isDark
    ? "rounded-lg border border-white/10 bg-white/5 px-4 py-2"
    : "rounded-lg border border-slate-200 bg-slate-50 px-4 py-2";
  const totalLabelClass = isDark ? "text-sm text-gray-300" : "text-sm text-slate-600";
  const totalValueClass = isDark ? "ml-1 text-lg font-bold text-white" : "ml-1 text-lg font-bold text-slate-900";

  const emptyCircleClass = isDark
    ? "mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900"
    : "mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full border border-slate-200 bg-gradient-to-br from-slate-100 to-slate-200";

  const emptyIconClass = isDark ? "text-3xl text-gray-500" : "text-3xl text-slate-400";
  const emptyTitleClass = isDark ? "mb-2 text-xl font-semibold text-gray-300" : "mb-2 text-xl font-semibold text-slate-700";
  const emptyBodyClass = isDark ? "mx-auto max-w-md text-gray-500" : "mx-auto max-w-md text-slate-500";

  const cardHoverBorder = isDark ? "hover:border-white/30" : "hover:border-slate-300";

  const customerNameClass = isDark
    ? "text-lg font-bold text-white transition-colors group-hover:text-cyan-200"
    : "text-lg font-bold text-slate-900 transition-colors group-hover:text-cyan-700";

  const serviceClass = isDark ? "mb-2 text-gray-400" : "mb-2 text-slate-600";
  const metaClass = isDark ? "text-gray-500" : "text-slate-500";

  const removeBtnClass = isDark
    ? "rounded-lg border border-red-500/30 bg-gradient-to-r from-red-500/20 to-red-600/10 px-4 py-2 font-medium text-red-300 hover:border-red-500/50 hover:bg-red-500/30 active:scale-95"
    : "rounded-lg border border-red-200 bg-red-50/80 px-4 py-2 font-medium text-red-700 hover:border-red-300 hover:bg-red-100 active:scale-95";

  return (
    <div className="p-2">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 p-2 text-white">
            <MdOutlineSupportAgent className="text-2xl" />
          </div>
          <div>
            <h2 className={titleClass}>Customer Queue</h2>
            <p className={subtitleClass}>Real-time status tracking</p>
          </div>
        </div>
        <div className={totalBadgeClass}>
          <span className={totalLabelClass}>Total: </span>
          <span className={totalValueClass}>{queueList.length}</span>
        </div>
      </div>

      {queueList.length === 0 ? (
        <div className="px-4 py-12 text-center">
          <div className={emptyCircleClass}>
            <FiUser className={emptyIconClass} />
          </div>
          <h3 className={emptyTitleClass}>Queue is Empty</h3>
          <p className={emptyBodyClass}>
            Add customers to start managing your queue. They will appear here with
            real-time status updates.
          </p>
        </div>
      ) : (
        <div className="max-h-[500px] space-y-4 overflow-y-auto pr-2">
          {queueList.map((item) => {
            const statusConfig = getStatusConfig(item.status);
            const StatusIcon = statusConfig.icon;

            return (
              <div
                key={item.id}
                className={`group relative rounded-xl border ${statusConfig.borderColor} bg-gradient-to-r ${statusConfig.gradient} p-5 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${cardHoverBorder}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div
                      className={`rounded-lg border p-3 ${statusConfig.color} ${statusConfig.borderColor}`}
                    >
                      <StatusIcon
                        className={`text-xl ${statusConfig.textColor}`}
                      />
                    </div>
                    <div className="text-left">
                      <div className="mb-1 flex items-center gap-3">
                        <h3 className={customerNameClass}>{item.customer}</h3>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${statusConfig.color} ${statusConfig.textColor}`}
                        >
                          {statusConfig.label}
                        </span>
                      </div>
                      <p className={serviceClass}>{item.service}</p>
                      <div className={`flex items-center gap-4 text-sm ${metaClass}`}>
                        <span>Added: {formatTime(item.timestamp)}</span>
                        <span>•</span>
                        <span>ID: {item.id.toString().slice(-6)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex min-w-[120px] flex-col gap-2">
                    {item.status === "waiting" && (
                      <button
                        type="button"
                        onClick={() => onUpdateStatus(item.id, "serving")}
                        className="rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-2 font-medium text-white shadow-lg shadow-emerald-500/20 hover:from-emerald-600 hover:to-emerald-700 active:scale-95"
                      >
                        Start Serving
                      </button>
                    )}
                    {item.status === "serving" && (
                      <button
                        type="button"
                        onClick={() => onUpdateStatus(item.id, "completed")}
                        className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 font-medium text-white shadow-lg shadow-blue-500/20 hover:from-blue-600 hover:to-blue-700 active:scale-95"
                      >
                        Mark Complete
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onRemoveFromQueue(item.id)}
                      className={removeBtnClass}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div
                  className={`pointer-events-none absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100 ${
                    isDark ? "via-white/10" : "via-slate-400/30"
                  }`}
                ></div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default QueueDisplay;
