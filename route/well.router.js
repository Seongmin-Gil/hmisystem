const router = require('express').Router();

const { getWells, getWellInfo, postComment, getComment } = require('../controller/well.controller');

router.route('/').get(getWells);
router.route('/comment/:wellName').post(postComment).get(getComment);
router.route('/:wellName').get(getWellInfo);

module.exports = router;
