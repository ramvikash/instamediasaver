const puppeteer = require('puppeteer');

exports.scrape = async (url) => {
  let browser;
  let videoUrl = null;

  browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/117.0 Safari/537.36'
  );

  page.on('response', async (res) => {
    const contentType = res.headers()['content-type'];
    if (contentType?.includes('video/mp4') && !videoUrl) {
      videoUrl = res.url();
    }
  });

  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(resolve => setTimeout(resolve, 5000)); // give time for video to load

  const thumbnail = await page.$eval('meta[property="og:image"]', el => el.content);

  await browser.close();

  return {
    video: videoUrl,
    thumbnail: thumbnail,
  };
};
