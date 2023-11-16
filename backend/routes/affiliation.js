const router = require('express').Router();
const AuthMiddleware = require('../middleware/auth');
const AffiliationController = require('../controller/affiliation');

router.post('/join', AuthMiddleware.auth, AffiliationController.join);

module.exports = router;