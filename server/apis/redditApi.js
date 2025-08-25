const axios = require("axios");
const fallbackMemes = require("../data/fallbackMemes.json");

function getFallbackMeme() {
  return fallbackMemes[Math.floor(Math.random() * fallbackMemes.length)];
}

// Fetch random meme from Reddit or fallback to static list
exports.getMeme = async () => {
  try {
    const { data } = await axios.get(
      "https://www.reddit.com/r/cryptomemes/.json",
      {
        params: { limit: 25 },
        timeout: 10000,
        headers: { "User-Agent": "crypto-advisor/1.0 (by your-app)" },
      }
    );

    const posts = data?.data?.children?.map((p) => p.data) || [];

    // Try Reddit preview images first
    const withPreview = posts.filter(
      (d) => d?.preview?.images?.[0]?.source?.url
    );
    if (withPreview.length) {
      const pick = withPreview[Math.floor(Math.random() * withPreview.length)];
      return pick.preview.images[0].source.url.replace(/&amp;/g, "&");
    }

    // Fallback to direct image links
    const withDirectImg = posts.filter((d) =>
      (d.url_overridden_by_dest || "").match(/\.(jpg|jpeg|png)$/i)
    );
    if (withDirectImg.length) {
      const pick =
        withDirectImg[Math.floor(Math.random() * withDirectImg.length)];
      return (pick.url_overridden_by_dest || "").replace(/&amp;/g, "&");
    }

    // No valid images found on Reddit
    console.warn("No Reddit memes found, using fallback.");
    return getFallbackMeme();
  } catch (e) {
    console.error("Reddit meme error:", e.message);
    return getFallbackMeme();
  }
};
