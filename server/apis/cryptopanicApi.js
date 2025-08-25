const axios = require("axios");

// Fetch news from CryptoPanic based on user preferences
exports.getNews = async (prefs) => {
  const { data } = await axios.get("https://cryptopanic.com/api/v1/posts/", {
    params: {
      auth_token: process.env.CRYPTOPANIC_API_KEY,
      public: true,
      currencies: prefs.assets.join(","),
      kind: prefs.contentTypes.includes("Market News") ? "news" : "media",
    },
  });

  return data.results.slice(0, 5);
};
