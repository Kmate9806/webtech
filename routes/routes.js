var express = require('express');

const router = express.Router();


var userController = require('../src/controller/userController');

router.get('/user/getAll', userController.getDataControllerfn);
router.post('/user/create', userController.createUserControllerFn);
module.exports = router;