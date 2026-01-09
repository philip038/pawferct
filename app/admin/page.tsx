"use client";

import { useState } from "react";
import AddProductForm from "./components/AddProductForm";

export default function AdminPage() {
  const [input, setInput] = useState("");
  const [allowed, setAllowed] = useState(false);

  const login = () => {
    if (input === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setAllowed(true);
    } else {
      alert("Wrong password");
    }
  };

  if (!allowed) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-sm space-y-4">
          <h1 className="text-xl font-semibold text-center">
            Admin Login
          </h1>

          <input
            type="password"
            placeholder="Enter admin password"
            className="w-full border rounded px-3 py-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            onClick={login}
            className="w-full bg-black text-white py-2 rounded"
          >
            Login
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      <AddProductForm />
    </main>
  );
}
