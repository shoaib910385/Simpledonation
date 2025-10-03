import React, { useState } from "react";

export default function Home() {
  const presetAmounts = [50, 100, 250, 500];
  const [amount, setAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState("");
  const [donations, setDonations] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const generateId = () => "DON-" + Math.floor(Math.random() * 1000000);

  const handleDonate = () => {
    let finalAmount = customAmount ? parseInt(customAmount) : amount;
    if (isNaN(finalAmount) || finalAmount < 10) {
      alert("Minimum donation is 10");
      return;
    }
    const newDonation = {
      id: generateId(),
      name: name || "Anonymous",
      email,
      amount: finalAmount,
      status: "pending",
      message,
    };
    setDonations([...donations, newDonation]);
    setCustomAmount("");
    setName("");
    setEmail("");
    setMessage("");
  };

  const approveDonation = (id) => {
    setDonations(
      donations.map((d) => (d.id === id ? { ...d, status: "approved" } : d))
    );
  };

  const rejectDonation = (id) => {
    setDonations(
      donations.map((d) => (d.id === id ? { ...d, status: "rejected" } : d))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6 shadow">
        <h1 className="text-3xl font-bold text-center">
          🌍 Gaza Relief Donation
        </h1>
        <p className="text-center mt-2 text-blue-100">
          Together we can make a difference ❤️
        </p>
      </header>

      {/* DONATION FORM */}
      <main className="flex flex-col items-center p-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4 text-center text-blue-700">
            Make a Donation
          </h2>

          {/* Preset buttons */}
          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            {presetAmounts.map((amt) => (
              <button
                key={amt}
                onClick={() => {
                  setAmount(amt);
                  setCustomAmount("");
                }}
                className={`px-4 py-2 rounded-xl font-semibold transition shadow ${
                  amount === amt && !customAmount
                    ? "bg-blue-600 text-white"
                    : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                }`}
              >
                ₹{amt}
              </button>
            ))}
          </div>

          {/* Inputs */}
          <input
            type="number"
            min="10"
            placeholder="Custom amount (min ₹10)"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            className="border rounded-lg w-full px-3 py-2 mb-3"
          />

          <input
            type="text"
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-lg w-full px-3 py-2 mb-3"
          />

          <input
            type="email"
            placeholder="Your email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg w-full px-3 py-2 mb-3"
          />

          <textarea
            placeholder="Message (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border rounded-lg w-full px-3 py-2 mb-4"
          />

          <button
            onClick={handleDonate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition"
          >
            🚀 Donate Now
          </button>
        </div>

        {/* ADMIN PANEL */}
        <div className="mt-12 w-full max-w-3xl">
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
            Admin Panel (Manual Approval)
          </h2>
          {donations.length === 0 ? (
            <p className="text-gray-500 text-center">
              No donations yet. Be the first donor ❤️
            </p>
          ) : (
            <div className="overflow-x-auto shadow-lg rounded-2xl">
              <table className="w-full border-collapse bg-white rounded-2xl overflow-hidden">
                <thead>
                  <tr className="bg-blue-100 text-left">
                    <th className="border p-3">ID</th>
                    <th className="border p-3">Name</th>
                    <th className="border p-3">Amount</th>
                    <th className="border p-3">Status</th>
                    <th className="border p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((d) => (
                    <tr key={d.id} className="hover:bg-gray-50">
                      <td className="border p-3">{d.id}</td>
                      <td className="border p-3">{d.name}</td>
                      <td className="border p-3 font-semibold">
                        ₹{d.amount}
                      </td>
                      <td className="border p-3">
                        <span
                          className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                            d.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : d.status === "approved"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {d.status}
                        </span>
                      </td>
                      <td className="border p-3 flex gap-2">
                        {d.status === "pending" && (
                          <>
                            <button
                              onClick={() => approveDonation(d.id)}
                              className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => rejectDonation(d.id)}
                              className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
