import { useState } from "react";

function Spinner() {
  return (
    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
  );
}

export default function AuthForm({ type = "login", onSubmit, loading }) {
  const isSignup = type === "signup";
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await onSubmit(form);
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isSignup ? "Sign up" : "Login"}
      </h2>

      {isSignup && (
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded bg-gray-700 text-white"
          required
        />
      )}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full mb-4 p-3 rounded bg-gray-700 text-white"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full mb-4 p-3 rounded bg-gray-700 text-white"
        required
      />

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded flex justify-center items-center gap-2"
      >
        {loading ? <Spinner /> : isSignup ? "Register" : "Login"}
      </button>
    </form>
  );
}
