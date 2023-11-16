const router = require('express').Router();

const UserRouter = require('./user');
const GardenRouter = require('./garden');


router.use('/user', UserRouter);
router.use('/garden', GardenRouter);
module.exports = router;