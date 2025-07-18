//const express = require('express');
//const cors = require('cors');
//const scraperRoutes = require('./routes/scraperRoutes');
//const puppeteer = required('puppeteer');
import express from 'express';
import cors from 'cors';
import scraperRoutes from './routes/scraperRoutes.js';
//import puppeteer from 'puppeteer';
import puppeteer from 'puppeteer-core';

const app = express();

const browser = await puppeteer.launch({
  headless: true, // Recommended for server environments
  executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium', // Use this path first
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});

// const browser = await puppeteer.launch({
//     args: ['--no-sandbox', '--disable-setuid-sandbox'],
// });

// const browser = await puppeteer.launch({
//   headless: true,
//   executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium', // or /usr/bin/chromium
//   //executablePath: puppeteer.executablePath(), // ✅ dynamically uses installed Chrome
//   args: ['--no-sandbox', '--disable-setuid-sandbox']
// });
app.use(cors());
app.use(express.json());
app.use('/api/scrape', scraperRoutes);


const PORT = process.env.PORT ||5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));