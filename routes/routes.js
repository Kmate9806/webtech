var express = require('express');

const router = express.Router();


var userController = require('../src/controller/userController');

router.route('/user/getAll').get(userController.getDataControllerfn);
router.route('/user/create').post(userController.createUserControllerFn);
