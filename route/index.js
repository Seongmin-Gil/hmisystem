const express = require('express');
const router = express.Router();
const userRouter = require('./user.router');
const areaRouter = require('./area.router');
const wellRouter = require('./well.router');

router.use('/user', userRouter);
router.use('/area', areaRouter);
router.use('/well', wellRouter);

module.exports = router;
