const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const path = require('path');
const rateLimit = require('express-rate-limit');
const QRCode = require('qrcode');

require('dotenv').config();

const urls = require('./database/utils');

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
});

app.get('/:name', async (req, res) => {
  try {
    const url = await urls.find(req.params.name);
    if (url) {
      res.redirect(url.url);
    } else {
      res.status(404);
      res.sendFile(path.join(__dirname, 'public/404.html'));
    }
  } catch (error) {
    res.status(500);
    res.json(error);
  }
});

app.post('/api/qrcode', limiter, async (req, res) => {
  try {
    const qr = await QRCode.toDataURL(`https://localhost:5000/${req.body.name}`, { errorCorrectionLevel: 'H' });
    res.status(201);
    res.send({ data: qr });
  } catch (error) {
    res.status(500);
    res.json(error);
  }
});

app.post('/api/billy', async (req, res) => {
  try {
    const url = await urls.create(req.body);
    res.status(201);
    res.json(url);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
});

module.exports = app;
