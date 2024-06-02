const vehicleService = require('../service/vehicleService'); 

var getDataControllerfn = async (req, res) => {
    try {
        var vehicle = await vehicleService.getDataFromDBService();
        res.send({ "status": true, "data": vehicle });
    } catch (error) {
        res.status(500).send({ "status": false, "message": "Error retrieving vehicles", "error": error.message });
    }
}

var createVehicleControllerFn = async (req, res) => {
    try {
        console.log(req.body);
        var status = await vehicleService.createVehicleDBService(req.body);
        console.log("********");
        console.log(status);
        console.log("********");

        if (status) {
            res.send({ "status": true, "message": "Vehicle created successfully" });
        } else {
            res.send({ "status": false, "message": "Error creating vehicle" });
        }
    } catch (error) {
        res.status(500).send({ "status": false, "message": "Error creating vehicle", "error": error.message });
    }
}

var updateVehicleControllerFn = async (req, res) => {
    try {
        console.log(req.params.id);
        console.log(req.body);
        var result = await vehicleService.updateOneVehicleDBService(req.params.id, req.body);

        if (result) {
            res.send({ "status": true, "message": "Vehicle updated successfully" });
        } else {
            res.send({ "status": false, "message": "Error updating vehicle" });
        }
    } catch (error) {
        res.status(500).send({ "status": false, "message": "Error updating vehicle", "error": error.message });
    }
}

var deleteVehicleControllerFn = async (req, res) => {
    try {
        console.log(req.params.id);
        var result = await vehicleService.deleteOneVehicleDBService(req.params.id);
        
        if (result) {
            res.send({ "status": true, "message": "Vehicle deleted successfully" });
        } else {
            res.send({ "status": false, "message": "Error deleting vehicle" });
        }
    
    }catch(error){
        res.status(500).send({ "status": false, "message": "Error deleting vehicle", "error": error.message });
    }

}

module.exports = {
    getDataControllerfn,
    createVehicleControllerFn,
    updateVehicleControllerFn,
    deleteVehicleControllerFn
}
