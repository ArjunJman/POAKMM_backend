const { Router } = require('express'); 
const utils = require('../utils/utils')

const AuthControllers = require('../controllers/auth');
const MatchControllers = require("../controllers/match");
const TicketControllers = require("../controllers/tickets");
const AdminDash = require("../controllers/admin_dashboard")

const router = Router();

//main apis
router.post('/login',AuthControllers.login);
router.post('/register', AuthControllers.saveUser);
router.get('/UserDetail',utils.authenticateJWT,AuthControllers.UserDetail);
router.get('/fetchMatches',MatchControllers.fetchAllMatch);
router.get('/fetchMatch/:mid',MatchControllers.fetchParticularMatch);
router.post('/newTicket',TicketControllers.CreateTicket);
router.post('/AddEvent',MatchControllers.EventData);
router.get('/adminDash',utils.authenticateJWT,AdminDash.GetAdminDashboard);

//internal
router.post('/internal/addMatches',utils.AddDataRecursively);

module.exports = router;