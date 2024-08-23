const { appData } = require('../middleware/dataSource');

const selectAreas = async () => {
  return await appData.query(
    `
    SELECT
      JSON_ARRAYAGG(AreaName) areas
    FROM area
    `
  );
};

module.exports = {
  selectAreas,
};