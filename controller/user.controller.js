const { insertUser, selectUser, existUser } = require('../service/user.service');
const userType = require('../middleware/userType');
const bcrypt = require('bcrypt');
const CustomError = require('../util/customError');
const saltRound = 8;

const signUp = async (req, res) => {
  const { id, password, name, type } = req.body;

  const valideResult = await existUser(id);

  if (Number(valideResult)) throw new CustomError(400, 'ALREADY EXISTS USER ID');

  const bcryptPassword = await bcrypt.hash(password, saltRound);

  const typeId = userType[type.toLowerCase()];
  await insertUser(id, bcryptPassword, name, typeId);
  return res.status(201).json({ message: 'SIGNUP' });
};

const login = async (req, res) => {
  const { id, password } = req.body;
  const [databaseInfo] = await selectUser(id);

  if (!databaseInfo) throw new CustomError(400, 'INVALID USER');

  const verifiedPassword = await bcrypt.compare(password, databaseInfo.Password);

  if (!verifiedPassword) throw new CustomError(400, 'INVALID PASSWORD');

  return res.status(200).json({ userType: databaseInfo.Type, message: 'LOGIN' });
};

module.exports = {
  signUp,
  login,
};
