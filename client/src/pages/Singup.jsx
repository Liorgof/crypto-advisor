import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const handleSignup = async (form) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Signup failed");

    localStorage.setItem("token", data.token);
    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <AuthForm type="signup" onSubmit={handleSignup} />
    </div>
  );
}
