import { useState } from "react";
import { FaUserPlus } from "react-icons/fa"
export default function QueueForm({ onAddCustomer }) {
  const [customer, setCustomer] = useState("");
  const [service, setService] = useState("");

  const handleChange = (e) => {
    setCustomer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // validation
    if (!customer.trim() || !service.trim()) return;
    onAddCustomer({ customer, service });
    setCustomer("");
  };

  return (
    <div className="border p-4 rounded-lg bg-gray-900">
      <h2 className="text-2xl font-bold mb-6">Add to Queue</h2>
      <form onSubmit={handleSubmit}>

        <input
          type="text"
          value={customer}
          onChange={handleChange}
          placeholder="Enter customer name"
          className="border p-2 rounded w-full mb-4"
        />

        <select value={service} onChange={(e) => setService(e.target.value)} className="border p-2 rounded w-full mb-4">
          <option value="" className="text-gray-600">Select Service</option>
          <option value="Consultation" className="text-black">Consultation</option>
          <option value="Payment" className="text-black">Payment</option>
          <option value="Support" className="text-black">Support</option>
        </select>

        <button
          type="submit"
          className="bg-cyan-500 text-white font-semibold w-full px-6 py-2 rounded"
        >
          <span className="inline-flex items-center gap-2 justify-center">
            <FaUserPlus /> Add to Queue
          </span>
        </button>
      </form>
    </div>
  );
}
