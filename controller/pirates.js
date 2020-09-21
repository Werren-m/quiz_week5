const {Pirates} = require('../models');

class PiratesController{
    static list(req,res){
        Pirates.findAll()
        .then(data => {
            res.render('Pirates', {Pirates:data});
        })
        .catch(err => res.render('error', err))
    }
}

module.exports = PiratesController;