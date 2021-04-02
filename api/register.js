const { text } = require('body-parser')
const moment = require('moment')


module.exports = app => {
    const save = async (req, res) =>{
        const info = await app.db('token')         
            .where({token: req.body.user.token})
            .first()
            .catch(err => res.json({
                error: 'Usuário não encontrado'
            }))
            console.log(info);
            console.log(info.idUser)
        if(info != ''){
            app.db('login')
            .update({email: req.body.user.email})
            .where({id: info.idUser})
            .catch(err => res.json({
                error: 'E-mail não atualizado'
            }))
            app.db('users')
            .update({name: req.body.user.name, avatar: req.body.user.avatar, street: req.body.user.street
            , district: req.body.user.district, city: req.body.user.city, number: req.body.user.number, cep: req.body.user.cep, state: req.body.user.state
            , phone: req.body.user.phone, idLogin: info.idUser})
            .where({idLogin: info.idUser})
            .then(_ => res.json({
                success: 'Usuário atualizado'
            }))
            .catch(err => res.json({
                error: 'Usuário não atualizado'
            }))
        }

    }
    return {save}

}

