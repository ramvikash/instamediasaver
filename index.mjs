const express = require('express');
const cors = require('cors');
const scraperRoutes = require('./routes/scraperRoutes');
const puppeteer = required('puppeteer');
// import express from 'express';
// import cors from 'cors';
// import scraperRoutes from './routes/scraperRoutes.js';
// import puppeteer from 'puppeteer';


const app = express();
const PORT = process.env.PORT ||5000;

app.use(cors());
app.use(express.json());
// app.use('/api/scrape', scraperRoutes);

app.post('/api/scrape', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'Missing Instagram URL' });
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,// <--- for debugging, set to true for deployment
      args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
      //'--window-size=1920,1080'
      ],
    });

    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/117.0 Safari/537.36'
    );

    //await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    let videoUrl = null;

    // Intercept .mp4 video responses
    page.on('response', async (response) => {
      const contentType = response.headers()['content-type'];
      if (contentType?.includes('video/mp4') && !videoUrl) {
        videoUrl = response.url();
      }
    });

    // Navigate to Instagram reel page
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

    // Wait to ensure video request occurs
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Extract thumbnail using DOM
    const thumbnail = await page.$eval('meta[property="og:image"]', el => el.content);

    // Return real video URL (not blob)
    if (!videoUrl) {
      return res.status(404).json({ error: 'Video not found' });
    }

    res.json({
      video: videoUrl,
      thumbnail: thumbnail,
    });

  } catch (err) {
    console.error('Scraping error:', err);
    res.status(500).json({ error: 'Scraping failed' });
  } finally {
    if (browser) await browser.close();
  }
});

// const browser = await puppeteer.launch({
//   headless: true, // Recommended for server environments
//   //executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium', // Use this path first
//   args: ['--no-sandbox', '--disable-setuid-sandbox']
// });


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
