const router = require('express').Router();

const {
  getWells,
  getWellInfo,
  postComment,
  getComment,
  postCheck,
} = require('../controller/well.controller');

router.route('/').get(getWells);
router.route('/comment/:wellName').post(postComment).get(getComment);
router.route('/:wellName').get(getWellInfo);
router.route('/check').post(postCheck);

module.exports = router;
