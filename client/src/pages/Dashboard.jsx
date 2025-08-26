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

  const vote = async (section, value, content) => {
    const payload = { section, value, content };

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
        votes: {
          ...prev.votes,
          [section]: { value, content },
        },
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

  const { news, prices, aiInsight, memeUrl, votes, preferences } = data;
  const selectedContentTypes = preferences?.contentTypes ?? [];

  const usingFallbackPrices = !Object.values(prices ?? {})?.[0]
    ?.last_updated_at;
  const usingFallbackNews = (news?.[0]?.domain || "").includes("mocknews.com");

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Your Crypto Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {selectedContentTypes.includes("AI Insight") && (
            <DashboardSection
              section="AI_INSIGHT"
              title="AI Insight of the Day"
              icon={<Brain size={20} />}
              votes={votes}
              onVote={vote}
              content={aiInsight}
              color="bg-purple-800"
            >
              <p>{aiInsight}</p>
            </DashboardSection>
          )}

          {selectedContentTypes.includes("Charts") && (
            <DashboardSection
              section="PRICE"
              title="Coin Prices"
              icon={<Coins size={20} />}
            >
              {usingFallbackPrices && (
                <div className="text-yellow-400 text-sm mb-2">
                  Live data is temporarily unavailable. Showing fallback prices.
                </div>
              )}
              <PriceList prices={prices} />
            </DashboardSection>
          )}

          {selectedContentTypes.includes("Fun") && (
            <DashboardSection
              section="MEME"
              title="Daily Meme"
              icon={<Smile size={20} />}
              votes={votes}
              onVote={vote}
              content={memeUrl}
            >
              <img
                src={memeUrl}
                alt="Meme"
                className="w-full max-h-80 object-contain rounded"
              />
            </DashboardSection>
          )}

          {selectedContentTypes.includes("Market News") && (
            <DashboardSection
              section="NEWS"
              title="Latest News"
              icon={<Newspaper size={20} />}
              votes={votes}
              onVote={vote}
              content={JSON.stringify(news)}
            >
              {usingFallbackNews && (
                <div className="text-yellow-400 text-sm mb-2">
                  Live news feed is temporarily unavailable. Displaying fallback
                  content.
                </div>
              )}
              <NewsList news={news} />
            </DashboardSection>
          )}
        </div>
      </div>
    </div>
  );
}
