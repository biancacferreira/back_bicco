const { text } = require('body-parser')
const moment = require('moment')

module.exports = app =>{

    const newPassword = async (req, res) =>{
        const info = await app.db('login')         
        .where({email: req.body.email })
        .first()
        .catch(err => res.json({
            error: 'Usuário não encontrado'
        }))
        if(info.password == req.body.updatePassword){
            res.json({
                error: 'A nova senha não poder ser igual a senha atual'
            })        
        }else if(info != '' && req.body.updatePassword != ''){
            
            app.db('login')
            .update({password: req.body.updatePassword})
            .where({email: req.body.email, id: info.id})
            .catch(err => res.json({
                error: 'Senha não atualizada'
            }))
        }
    }
    return {newPassword}
}