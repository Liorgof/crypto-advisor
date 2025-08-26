const axios = require("axios");

// Fallback news array
const fallbackNews = [
  {
    title: "Bitcoin Hits New All-Time High",
    url: "#",
    published_at: new Date().toISOString(),
    domain: "mocknews.com",
    slug: "btc-all-time-high",
  },
  {
    title: "Ethereum 2.0 Launch Imminent",
    url: "#",
    published_at: new Date().toISOString(),
    domain: "mocknews.com",
    slug: "eth2-launch",
  },
  {
    title: "Solana Shows Strong Recovery in Q3",
    url: "#",
    published_at: new Date().toISOString(),
    domain: "mocknews.com",
    slug: "solana-q3",
  },
  {
    title: "Crypto Market Sees Massive Inflows",
    url: "#",
    published_at: new Date().toISOString(),
    domain: "mocknews.com",
    slug: "market-inflows",
  },
  {
    title: "Regulatory Clarity Expected from SEC",
    url: "#",
    published_at: new Date().toISOString(),
    domain: "mocknews.com",
    slug: "sec-clarity",
  },
];

// News fetch function with fallback
exports.getNews = async (prefs) => {
  try {
    const { data } = await axios.get("https://cryptopanic.com/api/v1/posts/", {
      params: {
        auth_token: process.env.CRYPTOPANIC_API_KEY,
        public: true,
        currencies: prefs.assets.join(","),
        kind: prefs.contentTypes.includes("Market News") ? "news" : "media",
      },
      timeout: 10000,
    });

    return data.results.slice(0, 5);
  } catch (e) {
    console.error("getNews failed:", e.message);
    return fallbackNews;
  }
};
