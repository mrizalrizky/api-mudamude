const slugify = require('slugify')
const db = require('../models/index')
const { Op } = require('sequelize')

exports.createEventSlug = async (title) => {
    let slug = slugify(title, {
        replacement: '-',
        lower: true
    })
    
    const checkExist = await db.masterEvent.count({
        where: {
            slug: {
                [Op.like]: `${slug}%`
            }
        }
    })

    if (checkExist > 0) {
        slug = `${slug}-${checkExist}`
    }
    
    return slug
}