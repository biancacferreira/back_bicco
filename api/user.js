const bcrypt = require('bcrypt-nodejs');
const { authSecret } = require('../.env');
const jwt = require('jwt-simple');
const { first, userParams } = require('../config/db');

module.exports = app => {
   const save = async (req, res) =>{
        console.log(req.body)
        const userLogin = await app.db('login')
            .where({email: req.body.email})
            .first()
            
            // verifica se já tem cadastro
            if(userLogin){
                return res.json({
                    error: 'E-mail já cadastrado'
                })
            }else{
                //se não, ele insere as informações no bancos   
                

                // insere na tabela login o email e senha passados pela req
                app.db('login')
                    .insert({email: req.body.email, password: req.body.password})
                    .catch(err => res.json({
                        error: 'Não possivel cadastrar'
                    }))

                //usuario recem cadastrado
                const newUser = await app.db('login').where({email:  req.body.email}).first()
                    console.log(newUser)
                // na tabela users cadastra o nome passado pela req e o id do usuario recem cadastrado na tebale login 
                app.db('usuario')
                    .insert({name: req.body.name, idLogin: newUser.id})
                    .catch(err => res.json({
                        error:'Não possivel cadastrar'
                    }))

             //cria um token
                const playload = {id: newUser.id}
                const createToken =   jwt.encode(playload, authSecret)

                //adiciona um token para o novo ususario na tabela token
                app.db('token')
                .insert({token: createToken, idUser: newUser.id})
                .catch(err => res.json({
                    error: 'Não possivel cadastrar',
                }))


                const info = await app.db('login')
                    .join('usuario', 'idLogin', '=', newUser.id)
                    .join('token', 'idUser', '=', newUser.id)
                    .where('login.id', newUser.id)
                    .select('usuario.name',  'login.email', 'token.token')

                
                res.json({
                    data: info[0]
                })
            }

    }
    const getUser = async (req, res) =>{
       
        //vai buscar no banco, precisa ver como vai buscar;
        //exemplo abaixo
        
        const userToken = await app.db('token')
            .where({token: req.params.token})
            .first()

        
        const info = await app.db('login')
            .join('usuario', 'idLogin', '=', userToken.idUser)
            .where('login.id', userToken.idUser)
            .select()

        res.json({
            data: info[0]
        })
    }

    return {save, getUser}
}