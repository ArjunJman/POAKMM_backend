const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
const accessTokenSecret = 'youraccesstokensecret';

const users = [
    {
        username: 'john',
        password: 'password123admin',
        role: 'admin'
    }, {
        username: 'anna',
        password: 'password123member',
        role: 'member'
    }
];

app.post('/login', (req, res) => {
    // Read username and password from request body
    console.log(req.body)
    const { username, password } = req.body;

    // Filter user from the users array by username and password
    const user = users.find(u => { return u.username === username && u.password === password });

    if (user) {
        // Generate an access token
        const accessToken = jwt.sign({ username: user.username,  role: user.role }, accessTokenSecret);

        res.json({
            accessToken
        });
    } else {
        res.send('Username or password incorrect');
    }
});

const authenticateJWT = (req, res, next) => {
    console.log("fff")
    const authHeader = req.headers.authorization;
    console.log(authHeader)

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        console.log(token)
    
        jwt.verify(token, accessTokenSecret, (err, decoded) => {
          if (err) {
            res.status(401).send('Invalid token');
          } else {
            req.user = decoded; // Attach decoded user data to the request
            next();
          }
        });
      } else {
        res.status(401).send('Unauthorized');
      }
};

app.get('/prot', authenticateJWT, (req, res) => {
    if (req.user){
        console.log(req.user);
    }
    res.send("in")
});

app.listen(3000, () => {
    console.log('Authentication service started on port 3000');
});