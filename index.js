require('dotenv').config()

const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express();
const port = process.env.PORT;

app.use(cors())

app.get('/get', async (req, res) => {
  const { data } = await axios.get(process.env.PROVIDER, {
    params: {
      apikey: process.env.APIKEY,
      i: req.query.id,
    }
  });
  res.json(data);
});

app.get('/search', async (req, res) => {
  const { data } = await axios.get(process.env.PROVIDER, {
    params: {
      apikey: process.env.APIKEY,
      s: req.query.title,
    }
  });
  if (data.hasOwnProperty('Error')) {
    res.json([]);
  } else {
    res.json(data.Search);
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
});