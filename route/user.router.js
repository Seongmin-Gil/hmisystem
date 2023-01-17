const router = require('express').Router();
const { catchAsync } = require('../util/errorHandler');
const { validator } = require('../middleware');

const { signUpSchema, loginSchema } = require('../middleware/validator/user.validator');

const { signUp, login } = require('../controller/user.controller');

router.route('/signUP').post(validator(signUpSchema), catchAsync(signUp));
router.route('/login').post(catchAsync(login));

module.exports = router;
