const express = require('express');
const app = express();
const myRoute = require('./routes/allRoutes');


const bodyParser = require('body-parser');

app.use(express.json()); 
app.use(bodyParser.json());
app.use('/api', myRoute);  


app.listen(3000, () => {
    console.log('Authentication service started on port 3000');
});