const axios = require("axios");

const coingeckoMap = {
  BTC: "bitcoin",
  ETH: "ethereum",
  SOL: "solana",
  DOGE: "dogecoin",
  ADA: "cardano",
};

let cachedPrices = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 60 * 1000 * 10;

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

    if (cachedPrices) return cachedPrices;

    return {};
  }
};
