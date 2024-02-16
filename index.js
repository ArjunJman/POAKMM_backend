const path = require('path')
const express = require('express');
const app = express();
const myRoute = require('./routes/allRoutes');
const bodyParser = require('body-parser');
var cors = require('cors')

app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors())
app.use('/api', myRoute);


app.use('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})


app.listen(3000, () => {
    console.log('Authentication service started on port 3000');
});