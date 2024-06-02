const renterService = require('../service/renterService'); 

var getDataControllerfn = async (req, res) => {
    try {
        var renter = await renterService.getDataFromDBService();
        res.send({ "status": true, "data": renter });
    } catch (error) {
        res.status(500).send({ "status": false, "message": "Error retrieving renters", "error": error.message });
    }
}

var createRenterControllerFn = async (req, res) => {
    try {
        console.log("Request Body:", req.body); 
        var status = await renterService.createRenterDBService(req.body);
        console.log("Service Response:", status);

        if (status) {
            res.send({ "status": true, "message": "Renter created successfully" });
        } else {
            res.send({ "status": false, "message": "Error creating renter" });
        }
    } catch (error) {
        console.error("Error in createRenterControllerFn:", error); 
        res.status(500).send({ "status": false, "message": "Error creating renter", "error": error.message });
    }
}

var updateRenterControllerFn = async (req, res) => {
    try {
        console.log(req.params.id);
        console.log(req.body);
        var result = await renterService.updateOneRenterDBService(req.params.id, req.body);

        if (result) {
            res.send({ "status": true, "message": "Renter updated successfully" });
        } else {
            res.send({ "status": false, "message": "Error updating renter" });
        }
    } catch (error) {
        res.status(500).send({ "status": false, "message": "Error updating renter", "error": error.message });
    }
}

var deleteRenterControllerFn = async (req, res) => {
    try {
        console.log(req.params.id);
        var result = await renterService.deleteOneRenterDBService(req.params.id);
        
        if (result) {
            res.send({ "status": true, "message": "Renter deleted successfully" });
        } else {
            res.send({ "status": false, "message": "Error deleting renter" });
        }
    
    }catch(error){
        res.status(500).send({ "status": false, "message": "Error deleting renter", "error": error.message });
    }

}

module.exports = {
    getDataControllerfn,
    createRenterControllerFn,
    updateRenterControllerFn,
    deleteRenterControllerFn
}
