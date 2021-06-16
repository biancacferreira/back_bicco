const { text } = require('body-parser')
const moment = require('moment')

module.exports = app =>{
    console.log('entrou')
    const getToken = async (req, res) => {
        console.log(req.body.token)
        const  verificaToken = await app.db('token')
            .where({token: req.body.token})
            .first()    
            .catch(err => res.json({
                error: "Tokken não encontrado",
            }))
    
            if(verificaToken){
                console.log(verificaToken.idUser)
                const info = await app.db('login')
                .join('usuario', 'idLogin', '=', verificaToken.idUser)
                .join('token', 'idUser', '=', verificaToken.idUser)
                .where('login.id', verificaToken.idUser)
                .select('usuario.name', 'usuario.avatar', 'login.email', 'token.token')

                console.log(info)
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