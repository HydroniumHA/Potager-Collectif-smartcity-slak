const router = require('express').Router();
const UserController = require('../controller/user');

router.post('/login', UserController.login);
router.post('/register', UserController.register);


/**
 * @swagger
 * /user/login:
 *  post:
 *      tags:
 *          - User
 *      requestBody:
 *          $ref: '#/components/requestBodies/login'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/token'
 *          403:
 *              description: Connection non autorisée
 *          500:
 *              description: Erreur serveur
 * /user/register:
 *  post:
 *      tags: 
 *          - User
 *      requestBody:
 *          $ref: '#/components/requestBodies/register'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/token'
 *          409:
 *              description: L'utilisateur existe déjà
 *          500:
 *              description: Erreur serveur
 *          
 */

module.exports = router;
