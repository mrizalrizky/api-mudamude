const sequelize = require('sequelize')
const { nanoid } = require('nanoid')

function postsRepository (db) {
    const createUserPost = (id_user, content, url) => {
        const slug = nanoid(8)
        return db.postsDB.create({
            id_user,
            content,
            url,
            slug,
        })
    }

    const deleteUserPost = (slug) => {
        return db.postsDB.destroy({
            where: {
                slug
            }
        })
    }

    const getAllPosts = () => {
        return db.postsDB.findAll({
            order: [['createdAt', 'DESC']]
        })
    }

    const getPostDetailBySlug = (slug) => {
        return db.postsDB.findOne({
            where: {
                slug
            },
            include: {
                model: db.mudamudeUser,
            }
        })
    }

    const getListUserPostByUsername = (username) => {
        return db.postsDB.findAll({
            where: {
                id_user: {
                    [sequelize.Op.in]: [sequelize.literal(`SELECT id_user FROM mudamude_users WHERE username='${username}'`)]
                }
            },
            include: {
                model: db.mudamudeUser,

            }
        })
    }

    const getPostCommentsById = (id_post ) => {
        return db.postsDB.findAndCountAll({
            where: {
                id_post
            }, attributes: ['id_post'],
            include: {
                required: true,
                model: db.postComments,
                attributes: ['comment'],
                
                include: {
                    model: db.mudamudeUser,
                    attributes: ['fullName', 'institution']
                }
            } 
        })
    }

    return {
        createUserPost,
        deleteUserPost,
        getAllPosts,
        getPostDetailBySlug,
        getListUserPostByUsername,
        getPostCommentsById,
    }
}

module.exports = postsRepository