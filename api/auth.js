const { authSecret } = require('../.env');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');


module.exports = app =>{
    const signin = async (req, res) =>{
        //verifica se o e-mail ou senha enviado estão vazios
        if(!req.body.email || !req.body.password){
            return res.json({
                error: 'Dados incompletos'
            })
           
        }
        // se não estiver vazio ele consulta na tabela, pelo e-mail
        const user = await app.db('login') 
            .where({email: req.body.email})
            .first()
            
            if(user){
                // ele compara se a senha passada é igual a do banco
                if(req.body.password != user.password){
                    return res.json({
                        error: 'Senha incorreta'
                    })
                }

                // retorna todas as informações do usuário               
                

                const info = await app.db('login')
                .join('usuario', 'idLogin', '=', user.id)
                .join('token', 'idUser', '=', user.id)
                .where('login.id', user.id)
                .select('usuario.name',  'login.email', 'token.token')

               
               //verificar se encontrou algum usuário, se não ele retorna um erro
                if(info[0] == '' || info[0] == undefined){
                    return res.json({
                        error: 'Usuário não encontrado'
                    })                    
                }else{
                    res.json({
                        data: info[0]
                    })
                }
                
                
            }else{
                return res.json({
                    error: 'E-mail não encontrado'
                })
                
            }
    }

    return {signin}
}