

const express = require('express');
const router = express.Router();
const userController = require('../src/controller/userController'); 

const renterController = require('../src/controller/renterController');
const vehicleController = require('../src/controller/vehicleController');

router.get('/renter/getAll', renterController.getDataControllerfn);
router.post('/renter/create', renterController.createRenterControllerFn);
router.patch('/renter/update/:id', renterController.updateRenterControllerFn);
router.delete('/renter/delete/:id', renterController.deleteRenterControllerFn);

router.get('/vehicle/getAll', vehicleController.getDataControllerfn);
router.post('/vehicle/create', vehicleController.createVehicleControllerFn);
router.patch('/vehicle/update/:id', vehicleController.updateVehicleControllerFn);
router.delete('/vehicle/delete/:id', vehicleController.deleteVehicleControllerFn);

router.post('/user/login', userController.loginUser); 
router.post('/user/create', userController.createUser); 
module.exports = router;

















