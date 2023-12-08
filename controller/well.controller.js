const {
  selectWells,
  selectWellInfo,
  selectWellId,
  insertComment,
  selectComments,
  selectCommentTitle,
  updateComment,
  selectWellInfoBref,
  selectWellTotalData,
} = require('../service/well.service');

const CustomError = require('../util/customError');

const getWells = async (req, res) => {
  const wells = await selectWells();
  return res.status(200).json({ wells });
};

const getWellInfo = async (req, res) => {
  const { wellName } = req.params;
  let [wellInfo] = await selectWellInfo(wellName);
  if(wellInfo){
    wellInfo.connect = 1;
  } else {
    [wellInfo] = await selectWellInfoBref(wellName);
    wellInfo.connect = 0;
  }
  return res.status(200).json(wellInfo);
};

const postComment = async (req, res) => {
  const { wellName } = req.params;
  const { title, text } = req.body;
  const WellId = await findWellId(wellName);
  const [result] = await selectCommentTitle(WellId, title);
  if (result) {
    await updateComment(WellId, title, text);
  } else {
    await insertComment(WellId, title, text);
  }
  return res.status(201).json({ message: 'COMPLETE' });
};

const getComment = async (req, res) => {
  const { wellName } = req.params;
  const WellId = await findWellId(wellName);;
  const comments = await selectComments(WellId);
  return res.status(200).json({ comments });
};

const postCheck = async (req, res) => {
  const { id } = req.body;
  return res.status(200).json({ message: 'check' });
};

const getWellTotalData = async (req, res) => {
  const {wellName} = req.params;
  const WellId = await findWellId(wellName);
  const result = await selectWellTotalData(WellId);
  return res.status(201).json({ result });
}

const findWellId = async(wellName) => {
  const result = await selectWellId(wellName);
  if(!result[0]) {
    const err = new CustomError(401, "Invalid WellId")
    throw err;
  }
  return result[0]["WellId"];
}

module.exports = {
  getWells,
  getWellInfo,
  postComment,
  getComment,
  postCheck,
  getWellTotalData,
};
