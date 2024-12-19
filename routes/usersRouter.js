var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
const uploadFile = require('../middlewares/uploadFile')

/* GET users listing. */
router.get('/getAllUsers', userController.getAllUsers);
router.get('/getAllUserById/:id', userController.getAllUserById);
router.get('/getAllUsersSortDate', userController.getAllUsersSortDate);
router.get('/getAllUsersByDateX', userController.getAllUsersByDateX);
router.post('/AddUserClient', userController.AddUserClient);
router.post('/AddUserClientWithImg',uploadFile.single("image_user"), userController.AddUserClientWithImg);
router.put('/UpdateUserClient/:id', userController.UpdateUserClient);
router.put('/updateUserWithImg/:id',uploadFile.single("image_user"), userController.updateUserWithImg);
router.put('/UpdatePwdUserClient/:id', userController.UpdatePwdUserClient);
router.delete('/deleteUser/:id', userController.deleteUser);

module.exports = router;
