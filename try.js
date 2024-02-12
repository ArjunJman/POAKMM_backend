const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Use body-parser to parse incoming data
app.use(bodyParser.json());

// Define the route and callback function
app.post('/data', (req, res) => {
  // Access the data sent in the request body
  const data = req.body;

  // Log the data
  console.log(data);

  // Send a response
  res.send('Received data: ' + JSON.stringify(data));
});

app.get('/a',(req,res) => {
    res.send("you are in")
});

// Start the server
app.listen(3000, () => console.log('Server listening on port 3000'));
