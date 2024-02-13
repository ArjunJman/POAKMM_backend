const { Router } = require('express'); 
const utils = require('../utils/jwtauth')

const AuthControllers = require('../controllers/auth');
const MatchControllers = require("../controllers/match");
const TicketControllers = require("../controllers/tickets");

const router = Router();

router.post('/login',AuthControllers.login);
router.post('/register', AuthControllers.saveUser);
router.get('/prot',utils.authenticateJWT,AuthControllers.prot);
router.get('/fetchMatches',MatchControllers.fetchAllMatch);
router.get('/fetchMatch/:mid',MatchControllers.fetchParticularMatch);
router.post('/newTicket',TicketControllers.CreateTicket);

module.exports = router;