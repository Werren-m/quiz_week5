const {Ships} = require('../models');

class ShipsController{
    static list(req,res){
        Ships.findAll()
        .then(data => {
            res.render('Ships', {Ships:data});
        })
        .catch(err => res.render('error', err))
    }
}

module.exports = ShipsController;