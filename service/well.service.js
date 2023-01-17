const { appData } = require('../middleware/dataSource');

const selectWells = async () => {
  return await appData.query(
    `
    SELECT
      w.WellName,
      w.Latitude,
      w.Longitude,
      s.Status
    FROM well w
    INNER JOIN status s
    ON w.StatusId = s.StatusId
    `
  );
};

const selectWellInfo = async wellId => {
  return await appData.query(
    `
    SELECT
      w.Flow,
      w.Static,
      w.Diff,
      w.Cassing,
      w.Temperature,
      w.Roads,
      s.Status
    FROM well w
    INNER JOIN status s
    ON w.StatusId = s.StatusId
    WHERE w.WellName = ?
    `,
    [wellId]
  );
};

const selectWellId = async wellName => {
  return await appData.query(
    `
    SELECT
      WellId
    FROM well
    WHERE WellName = ?
    `,
    [wellName]
  );
};

const insertComment = async (wellId, title, text) => {
  return await appData.query(
    `
    INSERT INTO comment (
      WellId,
      Title,
      Comment
    ) VALUES(?, ?, ?)
    `,
    [wellId, title, text]
  );
};

const selectComments = async wellId => {
  return await appData.query(
    `
    SELECT
      CommentId,
      Title, 
      Comment
    FROM comment
    WHERE WellId = ?
    `,
    [wellId]
  );
};

module.exports = {
  selectWells,
  selectWellInfo,
  selectWellId,
  insertComment,
  selectComments,
};
