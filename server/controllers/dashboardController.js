const prisma = require("../db");
const { getNews } = require("../apis/cryptopanicApi");
const { getPrices } = require("../apis/coingeckoApi");
const { getMeme } = require("../apis/redditApi");
const { getAIInsight } = require("../apis/openrouterApi");

// Fetch full dashboard data
exports.getDashboardData = async (req, res) => {
  console.log(">> /dashboard HIT", new Date().toISOString());

  try {
    const userId = req.userId;

    //Load user preferences
    const prefs = await prisma.preference.findUnique({ where: { userId } });
    if (!prefs) return res.status(404).json({ error: "Preferences not found" });

    // Load latest votes per section (including content)
    const voteRows = await prisma.sectionVote.findMany({
      where: { userId },
      select: { section: true, value: true, content: true },
    });

    const votes = {};
    for (const v of voteRows) {
      votes[v.section] = { value: v.value, content: v.content };
    }

    //Fetch past AI_INSIGHT votes for fine-tuning
    const aiVotes = await prisma.sectionVote.findMany({
      where: { userId, section: "AI_INSIGHT" },
      orderBy: { createdAt: "desc" },
      take: 10,
      select: { value: true, content: true },
    });

    const liked = aiVotes
      .filter((v) => v.value)
      .map((v) => v.content)
      .filter(Boolean);
    const disliked = aiVotes
      .filter((v) => !v.value)
      .map((v) => v.content)
      .filter(Boolean);

    // Parallel API calls
    let news = [];
    try {
      news = await getNews(prefs);
    } catch (e) {
      console.error("getNews failed:", e.message);
    }

    let prices = {};
    try {
      prices = await getPrices(prefs);
    } catch (e) {
      console.error("getPrices failed:", e.message);
    }

    let memeUrl = null;
    try {
      memeUrl = await getMeme();
    } catch (e) {
      console.error("getMeme failed:", e.message);
    }

    let aiInsight = "";
    try {
      aiInsight = await getAIInsight(prefs, liked, disliked);
    } catch (e) {
      console.error("getAIInsight failed:", e.message);
      aiInsight = fallbackInsight();
    }

    // Return all dashboard data
    res.json({ news, prices, aiInsight, memeUrl, votes });
  } catch (err) {
    console.error("Dashboard error:", err.message);
    res.status(500).json({ error: "Failed to load dashboard data" });
  }
};

// Handle voting for specific dashboard section
exports.voteForSection = async (req, res) => {
  const userId = req.userId;
  const { section, value, content } = req.body;

  if (!userId || !section || typeof value !== "boolean" || !content) {
    return res.status(400).json({ error: "Invalid request" });
  }

  try {
    const vote = await prisma.sectionVote.upsert({
      where: {
        userId_section_content: { userId, section, content },
      },
      update: { value },
      create: { userId, section, value, content },
    });

    res.json({ success: true, vote });
  } catch (err) {
    console.error("Vote error:", err.message);
    res.status(500).json({ error: "Failed to save vote" });
  }
};
