const { text } = require('body-parser')
const moment = require('moment')

module.exports = app =>{
    const getBicco = async (req, res) =>{
        //vai buscar no banco, precisa ver como vai buscar;
        //exemplo abaixo
        const info = await app.db('token')         
            .where({token: req.params.token})
            .first()
            .catch(err => res.json({
                error: 'Usuário não encontrado'
            }))

       
        if(info != ''){
            app.db('bicco')
            .join('usuario', 'idLogin', '=', info.idUser)
            .where({idProvider: info.idUser})
            .select('usuario.name', 'usuario.date', 'bicco.specialty', 'bicco.city', 'bicco.desc',
            'bicco.value', 'bicco.from', 'bicco.to', 'bicco.interval', 'bicco.id',) 
            // posso por mais um where aqui
            //.orderBy('coloca o nome da coluna na tabela')
            // joga o que retornou na const getBicco
            .then(getBicco => res.json(getBicco))
            .catch(err => res.status(500).json(err))

           
        }
        
    }

    const save = async (req, res) => {   
        console.log(req)
        // body referencia sempre a conts que vc está usando
        // user.id = ao usuário que foi enviado junto há requisão
        const info = await app.db('token')         
            .where({token: req.body.token})
            .first()
            .catch(err => res.json({
                error: 'Usuário não encontrado'
            }))
            
        // vai começar a inserir
        if(info != ''){
            app.db('bicco')
            .insert({specialty: req.body.bicco.specialty, city: req.body.bicco.city,
                 desc: req.body.bicco.desc, value: req.body.bicco.value, from: req.body.bicco.from,
                 to: req.body.bicco.to, interval: req.body.bicco.interval, idProvider: info.idUser})
            .then(success => res.json({
                success: 'Bicco cadastrado'
            }))
            .catch(err => res.json({
                error: 'Não foi possível cadastrar;'
            }))
        }
        
       
    }
    // agora vai remover
    const remove = async (req, res) => {
        

        const info = await app.db('token')         
            .where({token: req.body.token})
            .first()
            .catch(err => res.json({
                error: 'Usuário não encontrado'
            }))
        if(info != ''){
            app.db('bicco')
            // params, ex: http://localhost:3000/91, onde 91 seria o parametro
            // userId: vou receber o id para ter certeza que está excluindo uma informação do usuário logado
            .where({id: req.params.id, idProvider: info.idUser})
            .del()
            .then(rowsDeleted =>{
                if(rowsDeleted > 0){
                    res.json({
                        success: 'Bicco deletado'
                    })
                }else{
                    const msg = `Não foi encontrado bicco com id ${req.params.id}.`
                    res.status(400).send(msg)
                }
            })
            .catch(err => res.status(400).json(err))
        }
       
    }

    const updateBicco =  async (req, res) => {

        const info = await app.db('token')         
            .where({token: req.body.token})
            .first()
            .catch(err => res.json({
                error: 'Usuário não encontrado'
            }))
        if(info != ''){
            console.log(req.params.id)
            console.log(req.body)
            app.db('bicco')
            .update({specialty: req.body.data.specialty, city: req.body.data.city,
            desc: req.body.data.desc, value: req.body.data.value, from: req.body.data.from,
            to: req.body.data.to, interval: req.body.data.interval})
            .where({id: req.params.id, idProvider: info.idUser})
            .then(success => res.json({
                success: 'Bicco atualizado'
            }))
            .catch(err => res.json({
                error: 'Bicco não atualizado'
            }))
        }
        
    }
    return {getBicco, save, remove, updateBicco}
}