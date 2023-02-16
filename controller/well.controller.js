const {
  selectWells,
  selectWellInfo,
  selectWellId,
  insertComment,
  selectComments,
  selectCommentTitle,
  updateComment,
} = require('../service/well.service');

const getWells = async (req, res) => {
  const wells = await selectWells();
  return res.status(200).json({ wells });
};

const getWellInfo = async (req, res) => {
  const { wellName } = req.params;
  const [wellInfo] = await selectWellInfo(wellName);
  return res.status(200).json(wellInfo);
};

const postComment = async (req, res) => {
  const { wellName } = req.params;
  const { title, text } = req.body;
  const [{ WellId }] = await selectWellId(wellName);
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
  const [{ WellId }] = await selectWellId(wellName);
  const comments = await selectComments(WellId);
  return res.status(200).json({ comments });
};

const postCheck = async (req, res) => {
  const { id } = req.body;
  console.log(id);
  return res.status(200).json({ message: 'check' });
};

module.exports = {
  getWells,
  getWellInfo,
  postComment,
  getComment,
  postCheck,
};
