const router = require('express').Router();
const { catchAsync } = require('../util/errorHandler');

const {
  getWells,
  getWellInfo,
  postComment,
  getComment,
  postCheck,
  getWellTotalData,
} = require('../controller/well.controller');

router.route('/').get(catchAsync(getWells));
router.route('/comment/:wellName').post(catchAsync(postComment)).get(catchAsync(getComment));
router.route('/:wellName').get(catchAsync(getWellInfo));
router.route('/check').post(catchAsync(postCheck));
router.route('/graph/:wellName').get(catchAsync(getWellTotalData));

module.exports = router;
