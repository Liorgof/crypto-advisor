const axios = require("axios");

// Fetch random meme from cryptomemes
exports.getMeme = async () => {
  const { data } = await axios.get(
    "https://www.reddit.com/r/cryptomemes/top.json",
    {
      params: { limit: 10, t: "day" },
      timeout: 10000,
    }
  );

  const posts = data.data.children;
  const images = posts.filter((p) =>
    (p.data.url_overridden_by_dest || "").match(/\.(jpg|jpeg|png)$/i)
  );

  if (images.length === 0) return null;

  const random = images[Math.floor(Math.random() * images.length)];
  return random.data.url_overridden_by_dest;
};
