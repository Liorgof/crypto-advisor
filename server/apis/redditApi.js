const axios = require("axios");

// Fetch random meme from cryptomemes
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

    const withPreview = posts.filter(
      (d) => d?.preview?.images?.[0]?.source?.url
    );
    if (withPreview.length) {
      const pick = withPreview[Math.floor(Math.random() * withPreview.length)];
      return pick.preview.images[0].source.url.replace(/&amp;/g, "&");
    }

    const withDirectImg = posts.filter((d) =>
      (d.url_overridden_by_dest || "").match(/\.(jpg|jpeg|png)$/i)
    );
    if (withDirectImg.length) {
      const pick =
        withDirectImg[Math.floor(Math.random() * withDirectImg.length)];
      return (pick.url_overridden_by_dest || "").replace(/&amp;/g, "&");
    }

    return null;
  } catch (e) {
    console.error("Reddit meme error:", e.message);
    return null;
  }
};
