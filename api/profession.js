const { text } = require('body-parser')
const moment = require('moment')

module.exports = app =>{ 

    const getProfession = async  (req, res) =>{

        const profession = await app.db('bicco')         
        .select('specialty')
        .then(profession => res.json(profession))
        .catch(err => res.json({
            error: 'Nenhuma profissão cadastrada'
        }))
        
    
    }
    return{getProfession}
}