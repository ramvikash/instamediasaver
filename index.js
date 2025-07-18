const express = require('express');
const cors = require('cors');
const scraperRoutes = require('./routes/scraperRoutes');
const puppeteer = required('puppeteer');

const app = express();
const browser = await puppeteer.launch({
  headless: true,
  executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/google-chrome', // or /usr/bin/chromium
  //executablePath: puppeteer.executablePath(), // ✅ dynamically uses installed Chrome
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});
app.use(cors());
app.use(express.json());
app.use('/api/scrape', scraperRoutes);


const PORT = process.env.PORT ||4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));