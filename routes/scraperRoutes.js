const express = require('express');
const { scrapeInstagram } = require('../controllers/scraperController');

const router = express.Router();
router.post('/', scrapeInstagram);

module.exports = router;
