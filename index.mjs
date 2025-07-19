// const express = require('express');
// const cors = require('cors');
// const scraperRoutes = require('./routes/scraperRoutes');
// const puppeteer = required('puppeteer');
import express from 'express';
import cors from 'cors';
import scraperRoutes from './routes/scraperRoutes.js';
import puppeteer from 'puppeteer';


const app = express();
const PORT = process.env.PORT ||5000;

app.use(cors());
app.use(express.json());
app.post('/api/scrape', scraperRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
