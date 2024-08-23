const router = require('express').Router();

const { getAreas } = require('../controller/area.controller');
const { catchAsync } = require('../util/errorHandler');

router.route('/').get(catchAsync(getAreas));

module.exports = router;
