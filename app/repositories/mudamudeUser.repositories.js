const sequelize = require('sequelize')

function mudamudeUserRepository (db) {
    const userSignUp = (fullName, username, email, password, id_role = 3) => {
        console.log(fullName, username, email, password, id_role);
        return db.mudamudeUser.create({
            fullName,
            username,
            email,
            password,
            id_role,
        })
    }

    const userLogin = async (username, password) => {
        const user = await db.mudamudeUser.findOne({
            where: {
                username
            }
        })

        if(password === user.password) {
            console.log("successful login");
        }
        else console.log("Login failed");
    }

    const getUserInfo = (username) => {
        return db.mudamudeUser.findAll({
            where: {
                username
            },
            include: {
                model: db.masterRoles
            }
        })
    }

    const getUserUploadedEvents = (username) => {
        return db.mudamudeUser.findAll({
            where: {
                username
            }, attributes: [
                'id_user',
                'username',
                sequelize.col('uploaded_events.id_event', 'id_event'),
                sequelize.col('uploaded_events.master_event.title', 'title'),
                sequelize.col('uploaded_events.master_event.organizer_name', 'organizer_name'),
                sequelize.col('uploaded_events.master_event.date', 'date'),
                sequelize.col('uploaded_events.master_event.slug', 'slug'),
            ],
            include:
            {
                model: db.uploadedEvents,
                attributes: [],
                required: true,

                include: {
                    model: db.masterEvent,
                    attributes: []
                }
            },
            raw: true,
        })
    }

    const getUserRegisteredEvents = (username) => {
        return db.mudamudeUser.findAll({
            where: {
                username
            }, attributes: [
                'id_user',
                'username',
                sequelize.col('registered_events.id_event', 'id_event'),
                sequelize.col('registered_events.master_event.title', 'title'),
                sequelize.col('registered_events.master_event.organizer_name', 'organizer_name'),
                sequelize.col('registered_events.master_event.date', 'date'),
                sequelize.col('registered_events.master_event.slug', 'slug'),
            ],
            include:
            {
                model: db.registeredEvents,
                attributes: [],
                required: true,

                include: {
                    model: db.masterEvent,
                    attributes: []
                }
            },
            raw: true,
        })
    }

    return {
        userSignUp,
        userLogin,
        getUserInfo,
        getUserUploadedEvents,
        getUserRegisteredEvents
    }
}

module.exports = mudamudeUserRepository