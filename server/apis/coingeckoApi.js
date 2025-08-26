const axios = require("axios");

// Map from user asset symbols to CoinGecko IDs
const coingeckoMap = {
  BTC: "bitcoin",
  ETH: "ethereum",
  SOL: "solana",
  DOGE: "dogecoin",
  ADA: "cardano",
};

// In-memory cache per unique asset combination
const priceCache = {};
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

exports.getPrices = async (prefs) => {
  const now = Date.now();

  const idsArray = prefs.assets.map((s) => coingeckoMap[s]).filter(Boolean);
  const idsKey = idsArray.sort().join(",");

  if (!idsKey) return {};

  if (priceCache[idsKey] && now - priceCache[idsKey].timestamp < CACHE_TTL_MS) {
    return priceCache[idsKey].data;
  }

  try {
    const { data } = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids: idsKey,
          vs_currencies: "usd",
          include_last_updated_at: true,
        },
        headers: {
          "User-Agent": "crypto-advisor/1.0 (contact@example.com)",
        },
        timeout: 10000,
      }
    );

    priceCache[idsKey] = { data, timestamp: now };
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

    // Filter fallback based on requested assets
    const filteredFallback = Object.fromEntries(
      idsArray.map((id) => [id, fallback[id]]).filter(([, val]) => val)
    );

    return filteredFallback;
  }
};
