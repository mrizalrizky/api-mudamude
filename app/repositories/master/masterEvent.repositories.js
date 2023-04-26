function masterEventRepository (db) {
    const uploadEvent = (id_category, title, description, organizer_name, location, date) => {
        return db.masterEvent.create({
            id_category,
            title,
            description,
            organizer_name,
            location,
            date
        })
    }

    return {
        uploadEvent,
    }
}

module.exports = masterEventRepository