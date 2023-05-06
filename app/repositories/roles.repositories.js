const sequelize = require('sequelize')

function masterRolesRepository(db) {
    const getAllRoles = () => {
        return db.masterRoles.findAll({})
    }

    const getAllRoleExcludeUserRole = (username) => {
        return db.masterRoles.findAll({
            where: {
                id_role: {
                    [sequelize.Op.notIn]: [sequelize.literal(`SELECT id_role FROM mudamude_users WHERE username='${username}'`)]
                }
            }
        })
    }

    return {
        getAllRoles,
        getAllRoleExcludeUserRole
    }
}

module.exports = masterRolesRepository