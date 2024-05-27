import express from 'express';
import { CategoryController } from './controller/category.controller';
import { UserController } from './controller/user.controller';
import { VehicleController } from './controller/vehicle.controller';

export function getRoutes() {
    const router = express.Router();

    const vehicleController = new VehicleController();

    router.get('/vehicles', vehicleController.getAll);
    router.get('/vehicles/:id', vehicleController.getOne);
    router.post('/vehicles', vehicleController.create);
    router.put('/vehicles', vehicleController.update);
    router.delete('/vehicles/:id', vehicleController.delete);

    const userController = new UserController();

    router.get('/users', userController.getAll);
    router.get('/users/:id', userController.getOne);
    router.post('/users', userController.create);
    router.put('/users', userController.update);
    router.delete('/users/:id', userController.delete);

    const categoryController = new CategoryController();

    router.get('/categories', categoryController.getAll);
    router.get('/categories/:id', categoryController.getOne);
    router.post('/categories', categoryController.create);
    router.put('/categories', categoryController.update);
    router.delete('/categories/:id', categoryController.delete);

    return router;
}
