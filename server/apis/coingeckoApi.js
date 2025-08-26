const axios = require("axios");

// Map from user asset symbols to CoinGecko IDs
const coingeckoMap = {
  BTC: "bitcoin",
  ETH: "ethereum",
  SOL: "solana",
  DOGE: "dogecoin",
  ADA: "cardano",
};

// Simple in-memory cache
let cachedPrices = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

exports.getPrices = async (prefs) => {
  const now = Date.now();

  const ids = prefs.assets
    .map((s) => coingeckoMap[s])
    .filter(Boolean)
    .join(",");

  if (!ids) return {};

  if (cachedPrices && now - cacheTimestamp < CACHE_TTL_MS) {
    return cachedPrices;
  }

  try {
    const { data } = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids,
          vs_currencies: "usd",
          include_last_updated_at: true,
        },
        headers: {
          "User-Agent": "crypto-advisor/1.0 (contact@example.com)",
        },
        timeout: 10000,
      }
    );

    cachedPrices = data;
    cacheTimestamp = now;

    return data;
  } catch (e) {
    console.error("getPrices failed:", e.message);

    const fallback = {
      bitcoin: { usd: 42000 },
      ethereum: { usd: 3000 },
      solana: { usd: 100 },
      dogecoin: { usd: 0.08 },
      cardano: { usd: 0.4 },
    };

    return fallback;
  }
};
