const { extractMedia } = require('../services/puppeteerService');

const scrapeInstagram = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url || !url.includes('instagram.com')) {
      return res.status(400).json({ success: false, error: 'Invalid Instagram URL' });
    }

    const data = await extractMedia(url);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { scrapeInstagram };
