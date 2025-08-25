const prisma = require("../db");

exports.savePreferences = async (req, res) => {
  const userId = req.userId;
  const { assets, investorType, contentTypes } = req.body;

  if (!Array.isArray(assets) || assets.length === 0) {
    return res.status(400).json({ error: "Please select at least one asset" });
  }

  if (!Array.isArray(contentTypes) || contentTypes.length === 0) {
    return res
      .status(400)
      .json({ error: "Please select at least one content type" });
  }

  if (
    !investorType ||
    typeof investorType !== "string" ||
    investorType.trim().length === 0
  ) {
    return res.status(400).json({ error: "Please select investor type" });
  }

  try {
    const existing = await prisma.preference.findUnique({
      where: { userId },
    });

    if (existing) {
      await prisma.preference.update({
        where: { userId },
        data: { assets, investorType, contentTypes },
      });
    } else {
      await prisma.preference.create({
        data: {
          userId,
          assets,
          investorType,
          contentTypes,
        },
      });
    }

    res.json({ message: "Preferences saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.getPreferences = async (req, res) => {
  const userId = req.userId;

  try {
    const prefs = await prisma.preference.findUnique({
      where: { userId },
    });

    if (!prefs)
      return res.status(404).json({ message: "No preferences found" });
    res.json(prefs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
