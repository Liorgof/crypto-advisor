const axios = require("axios");

const fallbackInsights = [
  "Bitcoin tends to rally mid-week after low-volume Mondays.",
  "Ethereum's gas fees are low – a good time to explore DeFi.",
  "Solana shows strong developer growth, driving long-term value.",
  "DOGE spikes often follow Elon Musk tweets – stay alert.",
  "Cardano is preparing a major update that may affect price.",
];

exports.getAIInsight = async (prefs, liked, disliked) => {
  let prompt =
    "Give me one short and personalized crypto insight of the day.\nBe concise and informative.";

  if (prefs?.investorType) {
    prompt = `I'm a ${prefs.investorType}.\n` + prompt;
  }

  if (prefs?.assets?.length) {
    prompt = `I'm interested in ${prefs.assets.join(", ")}.\n` + prompt;
  }

  if (prefs?.contentTypes?.length) {
    prompt += `\nMake it relevant to someone who likes ${prefs.contentTypes.join(
      ", "
    )}.`;
  }
  prompt += "\nmake it short (1-3 sentences).";

  try {
    const { data } = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct:free",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": process.env.SERVER_BASE_URL,
          "X-Title": "Moveo Crypto Dashboard",
          "Content-Type": "application/json",
        },
        timeout: 10000,
      }
    );

    const content = data.choices?.[0]?.message?.content?.trim();

    if (content) {
      return content;
    } else {
      console.warn("Empty AI response, using fallback");
      return pickRandomFallback();
    }
  } catch (err) {
    if (err.response) {
      console.error("OpenRouter error status:", err.response.status);
      console.error("OpenRouter response:", err.response.data);
    } else {
      console.error("OpenRouter general error:", err.message);
    }
    return pickRandomFallback();
  }
};

function pickRandomFallback() {
  const msg =
    fallbackInsights[Math.floor(Math.random() * fallbackInsights.length)];
  return `AI is currently unavailable. Here's one of our saved insights: ${msg}`;
}
