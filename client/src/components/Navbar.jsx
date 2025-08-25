import { useEffect, useState } from "react";

export default function Navbar() {
  const [name, setName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setName(data.name))
      .catch(() => {});
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center shadow">
      <div className="text-lg font-bold">Crypto Advisor</div>
      <div className="flex items-center gap-4">
        {name && <span>Hello, {name}</span>}
        <button
          onClick={handleLogout}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
