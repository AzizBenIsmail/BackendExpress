var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
/* GET users listing. */
router.post('/AddUserClient', userController.AddUserClient);
router.get('/getAllUsers', userController.getAllUsers);
router.get('/getAllUserById/:id', userController.getAllUserById);
router.get('/getAllUsersSortDate', userController.getAllUsersSortDate);
router.get('/getAllUsersByDateX', userController.getAllUsersByDateX);

module.exports = router;
