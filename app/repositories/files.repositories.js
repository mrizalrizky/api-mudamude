function filesRepository (db) {
    const insertNewFile = (id_user, id_event, filename, folderpath, filetype) => {
        return db.filesDB.create({
            id_user,
            id_event,
            filename,
            folderpath,
            filetype
        })
    }

    const getFileByIdEventOrUser = (id_event, id_user) => {
        if(id_event) {
            return db.filesDB.findOne({
                where: {
                    id_event
                }
            })
        }
        else if(id_user) {
            return db.filesDB.findOne({
                where: {
                    id_user
                }
            })
        }
    }

    return {
        insertNewFile,
        getFileByIdEventOrUser
    }
}

module.exports = filesRepository