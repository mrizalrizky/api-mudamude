function masterRolesRepository(db) {
    const getAllRoles = () => {
        return db.masterRoles.findAll({})
    }

    return {
        getAllRoles,
    }
}