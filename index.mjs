import express from 'express';
import cors from 'cors';
import scraperRoutes from './routes/scraperRoutes.js';
//import scraperController from './controllers/scraperController.js';
//import puppeteerService from './services/puppeteerService.js';
//import puppeteer from 'puppeteer';


const app = express();
const PORT = process.env.PORT ||5000;

app.use(cors());
app.use(express.json());
app.use('/api', scraperRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));