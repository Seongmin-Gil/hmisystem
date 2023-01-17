const router = require('express').Router();

const { getAreas } = require('../controller/area.controller');

router.route('/').get(getAreas);

module.exports = router;
