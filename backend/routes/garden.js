const router = require('express').Router();
const GardenController = require('../controller/garden');
const AffiliationRouter = require('./affiliation');

router.use('/affiliation', AffiliationRouter);
router.post('/search', GardenController.search);
router.get('/', GardenController.getAll);
module.exports = router;