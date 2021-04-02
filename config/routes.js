module.exports = app =>{
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/newPassword', app.api.resetPassword.newPassword)    
    app.post('/refresh', app.api.refresh.getToken)
    app.get('/users/:token', app.api.user.getUser)
    app.post('/register', app.api.register.save)
    app.get('/bicco/:token', app.api.bicco.getBicco)
    app.post('/bicco', app.api.bicco.save)
         

}


