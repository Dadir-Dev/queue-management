import "./App.css";
import { useState } from "react";
export default function App() {
  const [queue, setQueue] = useState([]);
  return (
    <div className="App text-center">
      <header>
        <h1 className="text-3xl font-bold">Queue Management System</h1>
        <p className="text-lg">Manage your customers efficiently</p>
      </header>
      <main className="grid grid-cols-2 gap-8 mt-8">
        <div className="border-r pr-4">
          <h2 className="text-xl font-semibold">Queue Form</h2>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Queue Display</h2>
        </div>
      </main>
    </div>
  );
}
