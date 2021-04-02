const { text } = require('body-parser')
const moment = require('moment')

module.exports = app =>{
    const getToken = async (req, res) => {
        const  verificaToken = await app.db('token')
            .where({token: req.body.token})
            .first()    
            .catch(err => res.json({
                error: "Tokken não encontrado",
            }))
        
         
            if(verificaToken){

                const info = await app.db('login')
                .join('users', 'idLogin', '=', verificaToken.id)
                .join('token', 'idUser', '=', verificaToken.id)
                .where('login.id', verificaToken.id)
                .select('users.name', 'users.avatar', 'login.email', 'token.token')

                res.json({
                    data: info[0]
                })
            }else{
                return res.json({
                    error: 'Token não encontrado'
                })
            }
    }

    return {getToken}
}