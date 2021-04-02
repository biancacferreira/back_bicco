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

        app.db('bicco')
            .where({idProvider: info.idUser})
            // posso por mais um where aqui
            //.orderBy('coloca o nome da coluna na tabela')
            // joga o que retornou na const getBicco
            .then(getBicco => res.json(getBicco))
            .catch(err => res.status(500).json(err))
    }

    const save = async (req, res) => {        

        // body referencia sempre a conts que vc está usando
        // user.id = ao usuário que foi enviado junto há requisão
        const info = await app.db('token')         
            .where({token: req.body.user.token})
            .first()
            .catch(err => res.json({
                error: 'Usuário não encontrado'
            }))
        // vai começar a inserir
        if(info != ''){
            app.db('bicco')
            .insert({desc: req.body.desc, location:req.body.location, value: req.body.value,
                specialty: req.body.specialty, idProvider: info.idUser})
            .catch(err => res.json({
                error: 'não cadastrou'
            }))
        }
        
       
    }


    // agora vai remover
    const remove = (req, res) => {
        app.db('bicco')
            // params, ex: http://localhost:3000/91, onde 91 seria o parametro
            // userId: vou receber o id para ter certeza que está excluindo uma informação do usuário logado
            .where({id: req.params.id, userId: req.user.id})
            .del()
            .then(rowsDeleted =>{
                if(rowsDeleted > 0){
                    res.status(204).send()
                }else{
                    const msg = `Não foi encontrada task com id ${req.params.id}.`
                    res.status(400).send(msg)
                }
            })
            .catch(err => res.status(400).json(err))
    }

    const updateTaskDoneAt = (req, res, doneAt) =>{
        app.db('bicco')
            .where({id: req.params.id, userId: req.user.id})
            .update({doneAt})
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const toggleTask = (req, res) =>{
        app.db('bicco')
            .where({id: req.params.id, userI: req.user.id})
            .first()
            .the(task => {
                if(!task){
                    const msg = `Bicco com id ${req.params.id} não encontrada.`
                    return res.status(400).send(msg)
                }

                const doneAt = task.doneAt ? null : new Date()
                updateTaskDoneAt(req, res, doneAt)
            })
            .catch(err => res.status(400).json(err))
    }
    return {getBicco, save, remove, toggleTask}
}