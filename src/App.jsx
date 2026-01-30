import "./App.css";
import { useState } from "react";
import QueueForm from "./components/QueueForm";
import QueueDisplay from "./components/QueueDisplay";

export default function App() {
  const [queue, setQueue] = useState([]);

  const addToQueue = (customer) => {
    // Use Date.now() as a number/unique ID
    setQueue((prevQueue) => {
      const nextQueue = [
        ...prevQueue,
        { ...customer, id: Date.now(), status: "waiting" },
      ];

      console.log("Queue list after submit:", nextQueue);
      return nextQueue;
    });
  };

  const removeFromQueue = (id) =>
    setQueue(queue.filter((customer) => customer.id !== id));

  const updateStatus = (id, newStatus) =>
    setQueue(
      queue.map((customer) =>
        customer.id === id ? { ...customer, status: newStatus } : customer,
      ),
    );

  return (
    <div className="App text-center bg-neutral-900 min-h-screen p-8 text-white">
      <header>
        <h1 className="text-3xl font-bold text-cyan-500">
          Queue Management System
        </h1>
        <p className="text-lg text-gray-400">
          Manage your customers efficiently
        </p>
      </header>
      <main className="grid grid-cols-2 gap-8 mt-8">
        <div className="border-r pr-4">
          <QueueForm onAddCustomer={addToQueue} />
        </div>
        <div>
          <QueueDisplay
            queueList={queue}
            onUpdateStatus={updateStatus}
            onRemoveFromQueue={removeFromQueue}
          />
        </div>
      </main>
    </div>
  );
}
