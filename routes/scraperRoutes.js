const express = require('express');
const router = express.Router();
const scraperController = require('../controllers/scraperController');


router.post('/scrape', scraperController.scrapeInstagramVideo);

module.exports = router;
