function mudamudeUserRepository (db) {
    const userSignUp = (fullName, username, email, password, id_role) => {
        console.log(fullName, username, email, password, id_role);
        return db.mudamudeUser.create({
            fullName,
            username,
            email,
            password,
            id_role
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
        return db.mudamudeUser.findAll({})
    }

    const getUserUploadedEvents = (username) => {
        // return db.mudamudeUser.find({
        //     include: {
        //         model: db.uploadedEvent,
        //         as: 'event'
        //     },
        //     where: {
        //         username
        //     }
        // })
        return db.mudamudeUser.findAll({
            include: {
                model: db.uploadedEvents,
                as: 'event'
            },
            where: {
                username
            }
        })
    }

    const getUserRegisteredEvents = (username) => {
        return db.mudamudeUser.find({
            where: {
                username
            }
        })
    }

    return {
        userSignUp,
        userLogin,
        getUserInfo,
        getUserUploadedEvents
    }
}

module.exports = mudamudeUserRepository