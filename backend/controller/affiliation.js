const pool = require('../model/database');
const AffiliationModel = require('../model/affiliation');

module.exports.join = async (req, res) => {
    const gardenID = req.body.gardenID;
    const user = req.client.user;

    if(!gardenID || !user) 
        res.sendStatus(400); //Bad request

    const connection = await pool.connect();

    try {
        const result = await AffiliationModel.hasAffiliation(connection, user, gardenID);

        if(result)
            res.sendStatus(409) //CONFLICT
        else {
            await AffiliationModel.join(connection, user, gardenID);
        
            res.sendStatus(200); //OK
        }
       
    } 
    catch(e) {
        console.log(e);
        res.sendStatus(500); //Error server
    }
    finally {
        connection.release();
    }

};

