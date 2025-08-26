import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AssetSelector,
  InvestorTypeSelector,
  ContentTypeSelector,
} from "../components/PreferenceFormSections";

function Spinner() {
  return (
    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
  );
}

export default function Onboarding() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    assets: [],
    investorType: "",
    contentTypes: [],
  });

  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = (field, value) => {
    setForm((prev) => {
      const values = prev[field];
      const updated = values.includes(value)
        ? values.filter((v) => v !== value)
        : [...values, value];
      return { ...prev, [field]: updated };
    });
  };

  const handleRadioChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/onboarding`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save preferences");
      }

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">Your Preferences</h2>

        <AssetSelector
          selectedAssets={form.assets}
          onChange={handleCheckboxChange}
        />

        <InvestorTypeSelector
          selected={form.investorType}
          onChange={handleRadioChange}
        />

        <ContentTypeSelector
          selectedContent={form.contentTypes}
          onChange={handleCheckboxChange}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded flex justify-center items-center gap-2"
        >
          {loading ? <Spinner /> : "Save & Continue"}
        </button>
      </form>
    </div>
  );
}
