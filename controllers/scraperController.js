const scraperService = require('../services/puppeteerService');

exports.scrapeInstagramVideo = async (req, res) => {
  const { url } = req.body;

  if (!url) return res.status(400).json({ error: 'Missing Instagram URL' });

  try {
    const data = await scraperService.scrape(url);
    if (!data.video) return res.status(404).json({ error: 'Video not found' });

    res.json(data);
  } catch (err) {
    console.error('Scraping failed:', err);
    res.status(500).json({ error: 'Scraping failed' });
  }
};

//module.exports =  scrapeInstagramVideo ;
