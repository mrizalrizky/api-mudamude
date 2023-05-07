module.exports = (app) => {
    require('./auth/auth.routes')(app)
    require('./profile/profile.routes')(app)
    require('./event/event.routes')(app)
    require('./roles.routes')(app)
    require('./posts/posts.routes')(app)
    require('./files.routes')(app)

}