// server/routes/route.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.get('/user/:userId', userController.allowIfLoggedin, userController.getUser);

router.get('/users', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), userController.getUsers);

router.put('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('updateAny', 'profile'), userController.updateUser);

router.delete('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'), userController.deleteUser);




//new routes 

//router and controller OK
router.get('/basic', userController.allowIfLoggedin, userController.grantAccess('readOwn', 'profile', 'credit'), userController.basic);

//router and controller OK
//router.get('/basic', userController.allowIfLoggedin, userController.basic );
router.get('/balance',  userController.allowIfLoggedin, userController.getBalance);

router.post('/balance', userController.allowIfLoggedin, userController.postBalance);




module.exports = router;