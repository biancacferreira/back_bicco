const multer = require('multer')
const bodyParser = require('body-parser')
const { text } = require('body-parser')
const moment = require('moment')


module.exports = app =>{
    
      
    const upload = multer({ dest: 'tmp/uploads' })

    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/newPassword', app.api.resetPassword.newPassword)    
    app.post('/refresh', app.api.refresh.getToken)
    app.get('/users/:token', app.api.user.getUser)
    app.post('/register', app.api.register.save)
    app.get('/bicco/:token', app.api.bicco.getBicco)
    app.post('/registerBicco', app.api.bicco.save)
    app.delete('/deleteBicco/:id', app.api.bicco.remove)
    app.put('/updateBicco/:id', app.api.bicco.updateBicco)
    app.post('/updatePassword', app.api.newPassword.newPassword)
    app.get('/profession', app.api.profession.getProfession)
    app.post('/biccos/', app.api.filter.biccos)
    app.post('/avatar', upload.single('avatar'), function (req, res)  {
      console.log(req.body)
      console.log(req.file)
      const { filename, size } = req.file
        
     res.send(filename)
    })

}