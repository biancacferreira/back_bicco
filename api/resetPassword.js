const moment = require('moment')
const { authSecret } = require('../.env');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');
const nodemailer = require('nodemailer');

const user = 'suportebicco@gmail.com'
const senha = 'R@100398ulBianca'
module.exports = app =>{
  
    const newPassword =async (req, res) =>{
        //verifica se tem usuário cadastrado no banco com esse e-mail
        const user = await app.db('login')
            .where({email: req.body.email})
            .first()
        
        if(!user){
            return res.json({
                error: 'E-mail não encontrado'
            })
        }else{
            //  se tiver usuário cadastrado ele vai gerar a senha com 8 digitos
            

            var passWord = '';
            var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            var randomChars2 = 'abcdefghijklmnopqrstuvwxyz';
            var number =  '0123456789';
            var caracter = '!#$%@*&';
            for ( var i = 0; i < 2; i++ ) {
                passWord += randomChars.charAt(Math.floor(Math.random() * randomChars.length)) +
                 randomChars2.charAt(Math.floor(Math.random() * randomChars2.length)) + 
                 number.charAt(Math.floor(Math.random() * number.length)) + 
                 caracter.charAt(Math.floor(Math.random() * caracter.length));
            }

            
            const email = req.body.email;
            //cria o transporter - e-mail que vai servir de servidor
            let transporter = nodemailer.createTransport({ 
                service: 'gmail', 
                auth: { 
                   user: 'suportebicco@gmail.com', 
                   pass: 'R@100398ulBianca' 
                 } 
                });
                //para onde vair enviar e o que será enviado
                const mailOptions = {
                    from: 'suportebicco@gmail.com', // sender address
                    to: email, // receiver (use array of string for a list)
                    subject: 'Subject of your email', // Subject line
                    html: '<p>Sua nova senha de acesso: '+passWord+'</p>'// plain text body
                  };
                  
                  //vai enviar o e-mail, se tiver não tiver erro ele vai gravar no banco a nova senha
                  transporter.sendMail(mailOptions, (err, info) => {
                    if(err)
                    return res.json({
                        error: 'E-mail não enviado'
                    })
                    else
                        app.db('login')
                        .update({password: passWord})
                        .where({email: req.body.email})
                        .catch(err => res.json({
                            error: 'Não foi possível salvar a senha'
                        }))
                        
                        return res.json({
                            success: 'E-mail enviado'
                        })
                 });
        }
    }

    return {newPassword}

}