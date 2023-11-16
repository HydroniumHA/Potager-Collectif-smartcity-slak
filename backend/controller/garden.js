const pool = require('../model/database');
const GardenModel = require('../model/garden');

module.exports.search = async (req, res) => {

    
    const {query} = req.body;
    const connection = await pool.connect();

    try {
        const result = await GardenModel.searchGarden(connection, query);
        
        res.json(result);
    } 
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
    finally {
        connection.release();
    }

};

module.exports.getAll = async (req, res) => {
    
    const connection = await pool.connect();

    try {
        const result = await GardenModel.getAll(connection);
        
        res.json(result);
    } 
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
    finally {
        connection.release();
    }

};