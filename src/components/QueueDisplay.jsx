import { FiClock, FiCheckCircle, FiUser, FiLoader } from "react-icons/fi";
import { MdOutlineSupportAgent } from "react-icons/md";

function QueueDisplay({ queueList, onUpdateStatus, onRemoveFromQueue }) {
  const getStatusConfig = (status) => {
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
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="p-2">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
            <MdOutlineSupportAgent className="text-2xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Customer Queue</h2>
            <p className="text-sm text-gray-400">Real-time status tracking</p>
          </div>
        </div>
        <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10">
          <span className="text-sm text-gray-300">Total: </span>
          <span className="text-lg font-bold text-white ml-1">
            {queueList.length}
          </span>
        </div>
      </div>

      {queueList.length === 0 ? (
        <div className="text-center py-12 px-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full mb-4 border border-slate-700">
            <FiUser className="text-3xl text-gray-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-300 mb-2">
            Queue is Empty
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Add customers to start managing your queue. They will appear here
            with real-time status updates.
          </p>
        </div>
      ) : (
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
          {queueList.map((item) => {
            const statusConfig = getStatusConfig(item.status);
            const StatusIcon = statusConfig.icon;

            return (
              <div
                key={item.id}
                className={`group relative bg-gradient-to-r ${statusConfig.gradient} backdrop-blur-sm rounded-xl p-5 border ${statusConfig.borderColor} hover:border-white/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-lg ${statusConfig.color} border ${statusConfig.borderColor}`}
                    >
                      <StatusIcon
                        className={`text-xl ${statusConfig.textColor}`}
                      />
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-lg text-white group-hover:text-cyan-200 transition-colors">
                          {item.customer}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${statusConfig.color} ${statusConfig.textColor}`}
                        >
                          {statusConfig.label}
                        </span>
                      </div>
                      <p className="text-gray-400 mb-2">{item.service}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-500">
                          Added: {formatTime(item.timestamp)}
                        </span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-500">
                          ID: {item.id.toString().slice(-6)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 min-w-[120px]">
                    {item.status === "waiting" && (
                      <button
                        onClick={() => onUpdateStatus(item.id, "serving")}
                        className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium rounded-lg hover:from-emerald-600 hover:to-emerald-700 active:scale-95 shadow-lg shadow-emerald-500/20"
                      >
                        Start Serving
                      </button>
                    )}
                    {item.status === "serving" && (
                      <button
                        onClick={() => onUpdateStatus(item.id, "completed")}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 active:scale-95 shadow-lg shadow-blue-500/20"
                      >
                        Mark Complete
                      </button>
                    )}
                    <button
                      onClick={() => onRemoveFromQueue(item.id)}
                      className="px-4 py-2 bg-gradient-to-r from-red-500/20 to-red-600/10 text-red-300 font-medium rounded-lg border border-red-500/30 hover:bg-red-500/30 hover:border-red-500/50 active:scale-95"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Progress indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default QueueDisplay;
