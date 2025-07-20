<<<<<<< HEAD
import express from 'express';
import cors from 'cors';
import scraperRoutes from './routes/scraperRoutes.js';
//import scraperController from './controllers/scraperController.js';
//import puppeteerService from './services/puppeteerService.js';
//import puppeteer from 'puppeteer';

=======
// const express = require('express');
// const cors = require('cors');
// const scraperRoutes = require('./routes/scraperRoutes');
// const puppeteer = required('puppeteer');
import express from 'express';
import cors from 'cors';
import scraperRoutes from './routes/scraperRoutes.js';
import puppeteer from 'puppeteer';
>>>>>>> ac070f6a57db4edfd6bdf5caf714d61a116990a2


const app = express();
const PORT = process.env.PORT ||5000;

app.use(cors());
app.use(express.json());
<<<<<<< HEAD
app.use('/api', scraperRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
=======
app.post('/api/scrape', scraperRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
>>>>>>> ac070f6a57db4edfd6bdf5caf714d61a116990a2
