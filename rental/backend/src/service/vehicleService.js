const vehicleModel = require('../model/vehicleModel'); 


module.exports.getDataFromDBService = async () => {
    try {
        const vehicles = await vehicleModel.find({});
        return vehicles;
    } catch (error) {
        throw new Error('Error retrieving data');
    }
}


module.exports.createVehicleDBService = async (vehicleDetails) => {
    try {
        const vehicleModelData = new vehicleModel(vehicleDetails);
        await vehicleModelData.save();
        return true;
    } catch (error) {
        throw new Error('Error creating vehicle');
    }
}

module.exports.updateOneVehicleDBService = async (id, vehicleDetails) => {
    try {
        const result = await vehicleModel.findByIdAndUpdate(id, vehicleDetails, { new: true });
        return result;
    } catch (error) {
        throw new Error('Error updating vehicle');
    }
}



module.exports.deleteOneVehicleDBService = async (id) => {
    try {
        const result = await vehicleModel.findByIdAndDelete(id);
        return result;
    } catch (error) {
        throw new Error('Error deleting vehicle');
    }
}
