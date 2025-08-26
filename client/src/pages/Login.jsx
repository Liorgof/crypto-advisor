import { useState } from "react";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (form) => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      let message = "An error occurred. Please try again.";

      if (err instanceof TypeError) {
        // Usually happens when the server is unreachable
        message =
          "The site is currently unavailable. Please try again in a few minutes.";
      } else if (err.message) {
        message = err.message;
      }

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <AuthForm type="login" onSubmit={handleLogin} loading={loading} />
    </div>
  );
}
