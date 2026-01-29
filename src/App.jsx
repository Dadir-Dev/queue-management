import "./App.css";
import { useState } from "react";
import QueueForm from "./components/QueueForm";

export default function App() {
  const [queue, setQueue] = useState([]);

  const addToQueue = (customer) => {
    setQueue([...queue, customer]);
  };

  /* const removeFromQueue = (index) => {
    setQueue(queue.filter((_, i) => i !== index));
  };

  const updateStatus = (index, status) => {
    const updatedQueue = [...queue];
    updatedQueue[index].status = status;
    setQueue(updatedQueue);
  }; */

  return (
    <div className="App text-center bg-black min-h-screen p-8 text-white">
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
          <h2 className="text-xl font-semibold">Queue Display</h2>
        </div>
      </main>
    </div>
  );
}
