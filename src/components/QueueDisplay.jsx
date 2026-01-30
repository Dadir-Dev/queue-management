function QueueDisplay({ queueList, onUpdateStatus, onRemoveFromQueue }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "waiting":
        return "#facc15"; // yellow-400
      case "serving":
        return "#4ade80"; // green-400
      case "completed":
        return "#60a5fa"; // blue-400
      default:
        return "#94a3b8"; // slate-400
    }
  };

  return (
    <div className="p-4 rounded-lg bg-neutral-800 text-white">
      <h2 className="text-2xl font-bold mb-6">Current Customers</h2>

      {queueList.length === 0 ? (
        <p className="text-gray-400">No Customer Data</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {queueList.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between text-left p-2 border-neutral-700 bg-neutral-900 rounded-lg"
            >
              <div className="">
                <h3 className="font-medium">{item.customer}</h3>
                <p className="text-gray-500">{item.service}</p>
                <span
                  className="text-xs uppercase px-3 py-2 rounded"
                  style={{
                    backgroundColor: getStatusColor(item.status),
                    color: "#000",
                  }}
                >
                  {item.status}
                </span>
              </div>

              <div className="flex gap-2">
                {item.status === "waiting" && (
                  <button
                    onClick={() => onUpdateStatus(item.id, "serving")}
                    className="text-sm bg-blue-600 px-3 py-2 rounded"
                  >
                    Serve
                  </button>
                )}
                {item.status === "serving" && (
                  <button
                    onClick={() => onUpdateStatus(item.id, "completed")}
                    className="text-sm bg-blue-600 px-3 py-2 rounded"
                  >
                    Complete
                  </button>
                )}
                <button
                  onClick={() => onRemoveFromQueue(item.id)}
                  className="text-sm bg-red-600 px-3 py-2 rounded"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default QueueDisplay;
