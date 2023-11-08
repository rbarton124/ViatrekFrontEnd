var express = require('express');
var router = express.Router();
var config = require('../config/config.js');

const fsPromises = require('fs').promises;

// Use a dynamic import for node-fetch
var fetch;


import('node-fetch').then(nodeFetch => {
  fetch = nodeFetch.default;
});

router.post('/search', async function(req, res, next) {
  const { query, searchType } = req.body;
  const url = `https://www.googleapis.com/customsearch/v1?key=${config.googleApiKey}&cx=${config.cx}&searchType=${searchType}&q=${encodeURIComponent(query)}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send(error.message);
  }
});

 const path = require('path');
 const filePath = path.join(__dirname, 'Basic.txt')

const { OpenAI } = require('openai');
const openai = new OpenAI({
  organization: config.OPENAI_ORG_ID,
  apiKey: config.OPENAI_API_KEY
});

router.post('/GPTItinerary', async function(req, res, next) {
    try {
      const filePath = path.join(__dirname, '..', 'Basic.txt');
      const data = await fsPromises.readFile(filePath, 'utf8')
      // Destructure 'message' from the parsed JSON bodys
      const { message } = req.body;

      // Call OpenAI API and await its response
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-16k",
        messages: [
          { role: "system", content: data },
          { role: "user", content: message },
        ],
      });

      // Send the completion message as JSON response to the client
      res.status(200).json({ completion: completion.choices[0].message});
      
    } catch (err) {
      // Pass the error to the error-handling middleware
      console.error(err);
      next(err);
    }
  });

module.exports = router;
