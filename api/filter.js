const { text } = require('body-parser')
const moment = require('moment')

module.exports = app =>{ 

    const biccos = async (req, res) =>{
      
        const bicco = await app.db('bicco')
        .join('usuario', 'idLogin', '=' , 'bicco.idProvider')
        .select('usuario.name', 'usuario.date', 'bicco.specialty', 'bicco.city', 'bicco.desc',
            'bicco.value', 'bicco.from', 'bicco.to', 'bicco.interval', 'bicco.id') 
        .modify(function(queryBuilder) {
            if (req.body.filters.specialty != '' && req.body.filters.specialty != null) {
                queryBuilder.where('specialty', req.body.filters.specialty);
            }
        })   
        .modify(function(queryBuilder){
            if(req.body.filters.city != '' && req.body.filters.city != null){
                queryBuilder.where('bicco.city', req.body.filters.city);
            }
        })
        .modify(function(queryBuilder){
            if(req.body.filters.interval != '' && req.body.filters.interval != null){
                queryBuilder.where('interval', req.body.filters.interval);
            }
        }) 
        .modify(function(queryBuilder){
            if(req.body.filters.from != '' && req.body.filters.to != ''){
                queryBuilder.where('from', req.body.filters.from);
            }
        })  
        .modify(function(queryBuilder){
            if(req.body.filters.to != '' && req.body.filters.from != ''){
                queryBuilder.where('to', req.body.filters.to);
            }
        })        
        .then(bicco => res.json(bicco))
        .catch(err => res.json({
            error: 'Nenhuma profissão cadastrada'
        }))
    }
    return {biccos}
}