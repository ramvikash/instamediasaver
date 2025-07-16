const express = require('express');
const cors = require('cors');
const scraperRoutes = require('./routes/scraperRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/scrape', scraperRoutes);

const PORT = process.env.PORT ||4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));