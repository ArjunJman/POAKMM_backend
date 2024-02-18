const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';
const { MatchModel } = require('../models/Models')

//authencticate access token everytime
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

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

// Internal tool to popoulate match collections
const AddDataRecursively = async (req, res) => {
  try {
    const Match_data = req.body
    for (Match in Match_data['allMatches']) {
      const NewMatch = Match_data['allMatches'][Match]
      const obj = new MatchModel(NewMatch)
      const result = await obj.save()
    }
    res.send("matches Added Successfully")
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  authenticateJWT,
  AddDataRecursively
}
