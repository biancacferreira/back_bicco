const moment = require('moment')
const { authSecret } = require('../.env');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');
const nodemailer = require('nodemailer');

const user = 'suportebicco@gmail.com'
const senha = 'R@100398ulBianca'
module.exports = app =>{
  
    const newPassword =async (req, res) =>{

        const user = await app.db('login')
            .where({email: req.body.email})
            .first()
        
        console.log(req.body.email)
        if(!user){
            return res.json({
                error: 'E-mail não encontrado'
            })
            console.log('passou pelo if')
        }else{
            const emailUser = req.body.email;
            console.log(emailUser)
            const passWord = Math.random().toString(36).slice(-6);
            console.log(passWord)
            app.get('/send', (req, res) =>{
                const tansporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    auth: {user, senha}
                })

                transporter.sendMail({
                    from: user,
                    to: emailUser,
                    subject: 'Alteração de senha',
                    text: "Sua nova senha é " + passWord,
                }).then(info =>{
                   res.json({
                      sucess: 'Email enviado'
                   })
                    
                }).catch(erro =>{
                    res.json({
                        error: 'Não enviou o e-mail'
                    })
                })
            })

        }
    }

    return {newPassword}

}