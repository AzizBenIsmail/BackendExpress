var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
const uploadFile = require('../middlewares/uploadFile')
const userValidation = require('../middlewares/userValidation')
const authmiddlewares = require('../middlewares/authmiddlewares')


/* GET users listing. */
router.get('/getAllUsers',authmiddlewares,userController.getAllUsers);
router.get('/getSessionUser',authmiddlewares, userController.getSessionUser);
router.get('/getAllUsersSortDate',authmiddlewares, userController.getAllUsersSortDate);
router.get('/getAllUsersByDateX',authmiddlewares, userController.getAllUsersByDateX);
router.get('/logout',authmiddlewares, userController.logout);
router.post('/login', userController.login);
router.post('/AddUserClient',authmiddlewares,userValidation, userController.AddUserClient);
router.post('/AddUserClientWithImg',authmiddlewares,uploadFile.single("image_user"), userController.AddUserClientWithImg);
router.put('/UpdateUserClient/:id',authmiddlewares, userController.UpdateUserClient);
router.put('/updateUserWithImg/:id',authmiddlewares,uploadFile.single("image_user"), userController.updateUserWithImg);
router.put('/UpdatePwdUserClient/:id',authmiddlewares, userController.UpdatePwdUserClient);
router.delete('/deleteUser/:id',authmiddlewares, userController.deleteUser);

module.exports = router;
