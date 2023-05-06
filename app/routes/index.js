module.exports = (app) => {
    // Authentication
    require('./auth/auth.routes')(app)
    require('./profile/profile.routes')(app)
    require('./event/event.routes')(app)
    require('./roles.routes')(app)
    require('./posts/posts.routes')(app)

}