const sequelize = require('sequelize')
const { createSlug } = require('../../utils/createSlug')

function masterEventRepository (db) {
    const uploadEvent = async (id_category, title, description, organizer_name, location, date) => {
        const slug = await createSlug(title)
        return db.masterEvent.create({
            id_category,
            title,
            slug,
            description,
            organizer_name,
            location,
            date
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
                date: {
                    [sequelize.Op.between]: [startDate, endDate]
                }
            }, order: ['date']
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

    const getListEventByDate = (date) => {
        return db.masterEvent.findAll({
            where: {
                date: {
                    [sequelize.Op.startsWith]: date
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