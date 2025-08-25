const axios = require("axios");

const coingeckoMap = {
  BTC: "bitcoin",
  ETH: "ethereum",
  SOL: "solana",
  DOGE: "dogecoin",
  ADA: "cardano",
};

// Fetch crypto prices from CoinGecko
exports.getPrices = async (prefs) => {
  const ids = prefs.assets
    .map((s) => coingeckoMap[s])
    .filter(Boolean)
    .join(",");
  if (!ids) return {};

  const { data } = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price",
    {
      params: { ids, vs_currencies: "usd", include_last_updated_at: true },
      timeout: 10000,
    }
  );

  return data;
};
