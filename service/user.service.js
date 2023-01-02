const { v4: uuid } = require("uuid");
const { appData } = require("../middleware/dataSource");

const insertUser = async (userId, password, name, typeId) => {
  const id = uuid();
  return await appData.query(
    `
    INSERT INTO user (
      id,
      UserId,
      Password,
      UserName,
      TypeId
    ) VALUES (?, ?, ?, ?, ?)
    `,
    [id, userId, password, name, typeId]
  );
};

const selectUser = async (id) => {
  return await appData.query(
    `
    SELECT
      UserName,
      Password,
      Type
    FROM user
    INNER JOIN usertype
    ON user.TypeId = usertype.TypeId
    WHERE UserId = ?
    `,
    [id]
  );
};

const existUser = async (userId) => {
  const [{ valideUser }] = await appData.query(
    `
    SELECT EXISTS(
      SELECT
        UserId
      FROM user
      WHERE userId = ?
    ) AS valideUser
    `,
    [userId]
  );

  return valideUser;
};

module.exports = {
  insertUser,
  selectUser,
  existUser,
};
