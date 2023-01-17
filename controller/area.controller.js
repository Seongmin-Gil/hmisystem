const { selectAreas } = require('../service/area.service');

const getAreas = async (req, res) => {
  const [Areas] = await selectAreas();
  Areas.areas = JSON.parse(Areas.areas);
  return res.status(200).json(Areas);
};

module.exports = {
  getAreas,
};
