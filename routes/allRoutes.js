const { Router } = require('express'); 
const utils = require('../utils/jwtauth')

const AuthControllers = require('../controllers/auth');
const MatchControllers = require("../controllers/match")

const router = Router();

router.post('/login',AuthControllers.login);
router.post('/register', AuthControllers.saveUser);
router.get('/prot',utils.authenticateJWT,AuthControllers.prot);
router.get('/fetchMatch',MatchControllers.fetchAllMatch);

module.exports = router;