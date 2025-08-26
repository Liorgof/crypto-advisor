import { useState } from "react";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignup = async (form) => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");

      localStorage.setItem("token", data.token);
      navigate("/onboarding");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <AuthForm type="signup" onSubmit={handleSignup} loading={loading} />
    </div>
  );
}
