const sequelize = require('sequelize')

function masterEventRepository (db) {
    const uploadEvent = async (id_category, title, slug, description, organizer_name, location, ticket_price, event_date, event_time, duration) => {
        return db.masterEvent.create({
            id_category,
            title,
            slug,
            description,
            organizer_name,
            location,
            ticket_price,
            event_date,
            event_time,
            duration
        })
    }

    const getAllEvent = () => {
        return db.masterEvent.findAll({})
    }

    const getEventDetail = (slug) => {
        return db.masterEvent.findOne({
            where: {
                slug
            }
        })
    }
    
    const getListUpcomingEvent = (startDate, endDate) => {
        return db.masterEvent.findAll({
            where: {
                event_date: {
                    [sequelize.Op.between]: [startDate, endDate]
                }
            }, order: ['event_date']
        })
    }

    const getListEventByTitle = (title) => {
        return db.masterEvent.findAll({
            where: {
                title: {
                    [sequelize.Op.like]: `${title}`
                }
            },
            include: {
                model: db.masterEventCategory,
                // as: 'category'
            }
        })
    }

    const getListEventByDate = (event_date) => {
        return db.masterEvent.findAll({
            where: {
                event_date: {
                    [sequelize.Op.startsWith]: event_date
                }
            }
        })
    }

    const getListEventByLocation = (location) => {
        return db.masterEvent.findAll({
            where: {
                location: {
                    [sequelize.Op.like]: `%${location}%`
                }
            }
        })
    }

    const getListEventByCategory = (id_category) => {
        return db.masterEvent.findAll({
            where: {
                id_category
            }
        })
    }

    return {
        uploadEvent,
        getAllEvent,
        getEventDetail,
        getListUpcomingEvent,
        getListEventByTitle,
        getListEventByDate,
        getListEventByLocation,
        getListEventByCategory,
    }
}

module.exports = masterEventRepository