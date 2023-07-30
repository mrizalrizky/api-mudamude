const sequelize = require("sequelize");

function masterRolesRepository(db) {
  const getAllRoles = () => {
    return db.masterRoles.findAll({
      where: {
        price: {
          [sequelize.Op.ne]: null,
        },
      },
    });
  };

  const getAllRoleExcludeUserRole = (username) => {
    return db.masterRoles.findAll({
      where: {
        // price: {
        //   [sequelize.Op.ne]: null,
        // },
        id_role: {
          [sequelize.Op.notIn]: [
            sequelize.literal(
              `SELECT id_role FROM mudamude_users WHERE username='${username}'`
            ),
          ],
        },
        // [sequelize.Op.and]: [
        //   sequelize.where(
        //     sequelize.fn(
        //       "NOTIN",
        //       sequelize.col(
        //         `SELECT id_role FROM mudamude_users WHERE username='${username}'`
        //       )
        //     )
        //   ),
        // ],
      },
      logging: true,
    });
  };

  return {
    getAllRoles,
    getAllRoleExcludeUserRole,
  };
}

module.exports = masterRolesRepository;
