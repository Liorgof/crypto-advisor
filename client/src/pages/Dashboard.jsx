import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import DashboardSection from "../components/DashboardSection";
import PriceList from "../components/PriceList";
import NewsList from "../components/NewsList";
import { Brain, Coins, Smile, Newspaper } from "lucide-react";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    const fetchDashboard = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/dashboard`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Failed to fetch");

        if (!ignore) setData(json);
      } catch (err) {
        if (!ignore) setError(err.message);
      }
    };

    fetchDashboard();
    return () => {
      ignore = true;
    };
  }, []);

  const vote = async (section, value) => {
    const payload = { section, value };
    if (section === "AI_INSIGHT" && data?.aiInsight) {
      payload.content = data.aiInsight;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/dashboard/vote`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Vote failed");
      setData((prev) => ({
        ...prev,
        votes: { ...prev.votes, [section]: value },
      }));
    } catch (err) {
      console.error("Vote error:", err.message);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <div className="p-6 text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <div className="p-6">Loading...</div>
      </div>
    );
  }

  const { news, prices, aiInsight, memeUrl, votes } = data;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Your Crypto Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <DashboardSection
            section="AI_INSIGHT"
            title="AI Insight of the Day"
            icon={<Brain size={20} />}
            votes={votes}
            onVote={vote}
            color="bg-purple-800"
          >
            <p>{aiInsight}</p>
          </DashboardSection>

          <DashboardSection
            section="PRICE"
            title="Coin Prices"
            icon={<Coins size={20} />}
            votes={votes}
            onVote={vote}
          >
            <PriceList prices={prices} />
          </DashboardSection>

          <DashboardSection
            section="MEME"
            title="Daily Meme"
            icon={<Smile size={20} />}
            votes={votes}
            onVote={vote}
          >
            <img
              src={memeUrl}
              alt="Meme"
              className="w-full max-h-80 object-contain rounded"
            />
          </DashboardSection>

          <DashboardSection
            section="NEWS"
            title="Latest News"
            icon={<Newspaper size={20} />}
            votes={votes}
            onVote={vote}
          >
            <NewsList news={news} />
          </DashboardSection>
        </div>
      </div>
    </div>
  );
}
