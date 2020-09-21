const {Router} = require('express');
const router = Router();
const {Pool , Client} = require('pg');
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "code-challange",
    password: "admin",
    port: 5432
})

const PiratesController = require('../controller/pirates');
const ShipsController = require('../controller/ships');

router.get('/',(req,res) => {
    res.render('index.ejs')
})
router.get('/pirates', PiratesController.list);

router.get('/ships', ShipsController.list);

router.get('/ships/add', (req,res) => {
    res.render('ships/newShip.ejs');
})

router.get('/pirates/add', (req,res) => {
    res.render('pirates/newPirates.ejs');
})

router.post('/pirates/add', (req,res) => {
    // console.log(req.body.name);
    // console.log(req.body.status);
    // console.log(req.body.type);
    res.send(req.body);
    const {name,status,haki} = req.body;
    console.log(name,status,haki);
    addPirateQuery = `
    INSERT INTO public."Pirates" (name,status,haki)
    VALUES
    ('${req.body.name}', '${req.body.status}','${req.body.haki}')
    `
    pool.query(addPirateQuery, (err,data) => {
        if(err){
            throw err;
        }else{
            console.log("Data inserted succesfully");
            pool.end();
        }
    })
})

router.post('/ships/add', (req,res) => {
    // console.log(req.body.name);
    // console.log(req.body.status);
    // console.log(req.body.type);

    res.send(req.body);
    const {name,type,power} = req.body;
    console.log(name,type,power);
    addShipsQuery = `
    INSERT INTO public."Ships" (name,type,power)
    VALUES
    ('${req.body.name}', '${req.body.type}','${req.body.power}')
    `
    pool.query(addShipsQuery, (err,data) => {
        if(err){
            throw err;
        }else{
            console.log("Data inserted succesfully");
            pool.end();
        }
    })
})

router.get('/ships/delete:id', (req, res) => {
    // deleteShipQuery(x) = `DELETE FROM public."ships" WHERE id = ${x}`
    const a = req.params.id.slice(1)
    const b = Number(a);
    const deleteShipQuery = `
    DELETE FROM public."Ships" WHERE id = ${b}
    `
    pool.query(deleteShipQuery, (err, data) => {
        if(err){
            throw err;
        }else{
            res.send("Ship deleted")
            pool.end()
        }
    })
})

router.get('/pirates/delete:id', (req, res) => {
    const a = req.params.id.slice(1)
    const b = Number(a);
    const deletePiratesQuery = `
    DELETE FROM public."Pirates" WHERE id = ${b}
    `
    pool.query(deletePiratesQuery, (err, data) => {
        if(err){
            throw err;
        }else{
            res.send("Pirate deleted")
            pool.end()
        }
    })
    
})

module.exports = router;