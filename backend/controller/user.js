const pool = require('../model/database');
const UserModel = require('../model/user');
const Crypt = require('../controller/crypt');
const JWT = require('../controller/jwt');


/**
 * @swagger 
 *  components:
 *      responses:
 *          token:
 *              description: Renvoie le token suite à la connection ou la création de compte
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              token:
 *                                  type: integer
 * 
 * 
 *
 *      requestBodies:
 *          login:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              email:
 *                                  type: string
 *                              password:
 *                                  type: string
 *                          required:
 *                              - email
 *                              - password
 *          register:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              email:
 *                                  type: string
 *                              password:
 *                                  type: string
 *                              name:
 *                                  type: string
 *                              firstName: 
 *                                  type: string
 *                          required:
 *                              - email
 *                              - password
 *                              - name
 *                              - firstName
 *          
 * 
 */
module.exports.login = async (req, res) => {

    const { email, password } = req.body;
    
    const connection = await pool.connect();

    try {
        const result = await UserModel.getUser(connection, email);
        
        if (result) {
            const arePasswordEquals = Crypt.comparePasswords(password, result.password);
            if (arePasswordEquals) {
                res.json(JWT.sign(result.isAdmin, email, result.first_name, result.name));
            } 
            else {
                res.sendStatus(403);
            }
        } 
        else {
            res.sendStatus(403);
        }
      }
      catch (error) {
        console.log(error);
        res.sendStatus(500);
    } 
    finally {
        connection.release();
    }

};

/** Register a new user in database
 * 
 * Router Handler
 */
module.exports.register = async (req, res) => {
    const { email, name, firstName, password} = req.body;

    const connection = await pool.connect();

    try {
        const result = await UserModel.addNewUser(connection, email, name, firstName, password);

        if (result) {
            res.sendStatus(201);
        }
        else {
            // 409 = Conflit avec le serveur soit l'adresse email est déjà présente
            res.sendStatus(409);
        }     
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
    finally {
        connection.release();
    }
}

