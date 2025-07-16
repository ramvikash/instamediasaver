const puppeteer = require('puppeteer');

async function extractMedia(url) {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
      '--window-size=1920x1080',
    ],
  });

  const page = await browser.newPage();

  // ✅ Set desktop user-agent (avoid mobile/minimal HTML fallback)
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.133 Safari/537.36'
  );

  const media = { video: null, image: null };

  // ✅ Intercept network responses to capture .mp4
  page.on('response', async (response) => {
    const reqUrl = response.url();

    if (!media.video && reqUrl.includes('.mp4') && reqUrl.includes('instagram')) {
      media.video = reqUrl;
    }
  });

  // ✅ Go to post URL
  await page.goto(url, { waitUntil: 'networkidle2' });

  // ✅ Try grabbing video from meta tags first
  try {
    const ogVideo = await page.$eval(
      'meta[property="og:video"]',
      (el) => el.getAttribute('content')
    );
    if (ogVideo && ogVideo.includes('.mp4')) {
      media.video = ogVideo;
    }
  } catch (e) {
    console.log('ℹ️ No og:video tag found');
  }

  // ✅ Get correct post image (not profile pic)
  try {
    const ogImage = await page.$eval(
      'meta[property="og:image"]',
      (el) => el.getAttribute('content')
    );
    if (ogImage && !ogImage.includes('/v/t51.2885-19/')) {
      // filters out profile images
      media.image = ogImage;
    }
  } catch (e) {
    console.log('ℹ️ No og:image tag found');
  }

  await browser.close();
  return media;
}

module.exports = { extractMedia };
