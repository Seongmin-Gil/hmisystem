const router = require("express").Router();
const { catchAsync } = require("../util/errorHandler");
const { signUp, login } = require("../controller/user.controller");

router.route("/").post(catchAsync(signUp)).get(catchAsync(login));

module.exports = router;
