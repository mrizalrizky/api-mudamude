const sequelize = require('sequelize')

function postRatingsReposptory (db) {
    const getPositiveRatingCountById = (id_post, id_master_rating_type = 1) => {
        return db.postRatings.findAndCountAll({
            where: {
                id_post,
            }, attributes: [
                'id_post_rating',
                'id_post',
                'id_user',
                sequelize.col('master_rating_type.id_master_rating_type', 'id_master_rating_type'),
                sequelize.col('master_rating_type.name', 'name')
            ],
            include: [
                {
                    model: db.masterRatingType,
                    where: {
                        id_master_rating_type
                    }, attributes: []
                }
            ],
            raw: true,
        })
    }

    const getNegativeRatingCountById = (id_post, id_master_rating_type = 2) => {
        return db.postRatings.findAndCountAll({
            where: {
                id_post,
            },
            include: [
                {
                    model: db.masterRatingType,
                    where: {
                        id_master_rating_type
                    },
                    attributes: ['name']
                }
            ]
        })
    }
    
    return {
        getPositiveRatingCountById,
        getNegativeRatingCountById,
    }
}

module.exports = postRatingsReposptory