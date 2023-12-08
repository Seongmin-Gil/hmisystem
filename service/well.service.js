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
      w.WellName,
      s.Status,
      a.AreaName,
      d.GasFlowRate,
      d.TodayFlow,
      d.FlowTimeToday,
      d.StaticPressure,
      d.DiffPressure,
      d.Temperature,
      d.CondenstateToday,
      d.ESDZSO,
      d.HighSepLevel,
      d.OrificePlate,
      d.Voltage 
    FROM well w
    INNER JOIN status s
    ON w.StatusId = s.StatusId
    INNER JOIN area a
    ON a.AreaId = w.AreaId
    inner join data d 
    on w.WellId = d.WellId 
    WHERE w.WellName = ?
    order by d.Id desc
    limit 1;
    `,
    [wellId]
  );
};

const selectWellInfoBref = async wellId => {
  return await appData.query(
    `
    SELECT
      w.WellName,
      s.Status,
      a.AreaName
    FROM well w
    INNER JOIN status s
    ON w.StatusId = s.StatusId
    INNER JOIN area a
    ON a.AreaId = w.AreaId 
    WHERE w.WellName = ?;
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

const selectCommentTitle = async (wellId, title) => {
  return await appData.query(
    `
    SELECT
      *
    FROM comment
    WHERE Wellid = ?
    AND Title = ?
    `,
    [wellId, title]
  );
};

const updateComment = async (wellId, title, text) => {
  return await appData.query(
    `
    UPDATE comment
    SET Comment = ?
    WHERE WellId = ?
    AND Title =?
    `,
    [text, wellId, title]
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

const selectWellTotalData = async wellId => {
  return await appData.query(
    `
    SELECT
      W.WellName,
      d.GasFlowRate,
      d.StaticPressure,
      d.DiffPressure,
      d.Temperature
    FROM data d
    INNER JOIN well w
    ON d.WellId = w.WellId
    WHERE d.WellId = ?
    `, [wellId]
  )
}

module.exports = {
  selectWells,
  selectWellInfo,
  selectWellId,
  selectWellInfoBref,
  insertComment,
  selectComments,
  selectCommentTitle,
  updateComment,
  selectWellTotalData,
};
