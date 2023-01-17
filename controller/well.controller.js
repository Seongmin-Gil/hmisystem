const {
  selectWells,
  selectWellInfo,
  selectWellId,
  insertComment,
  selectComments,
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
  await insertComment(WellId, title, text);
  return res.status(201).json({ message: 'COMPLETE' });
};

const getComment = async (req, res) => {
  const { wellName } = req.params;
  const [{ WellId }] = await selectWellId(wellName);
  const comments = await selectComments(WellId);
  return res.status(200).json({ comments });
};

module.exports = {
  getWells,
  getWellInfo,
  postComment,
  getComment,
};
