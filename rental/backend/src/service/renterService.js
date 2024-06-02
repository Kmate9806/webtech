const renterModel = require('../model/renterModel'); 


module.exports.getDataFromDBService = async () => {
    try {
        const renters = await renterModel.find({});
        return renters;
    } catch (error) {
        throw new Error('Error retrieving data');
    }
}


module.exports.createRenterDBService = async (renterDetails) => {
    try {
        const renterModelData = new renterModel(renterDetails);
        await renterModelData.save();
        console.log("Renter saved to database:", renterModelData); 
        return true;
    } catch (error) {
        console.error("Error in createRenterDBService:", error); 
        throw new Error('Error creating renter');
    }
}


module.exports.updateOneRenterDBService = async (id, renterDetails) => {
    try {
        const result = await renterModel.findByIdAndUpdate(id, renterDetails, { new: true });
        return result;
    } catch (error) {
        throw new Error('Error updating renter');
    }
}



module.exports.deleteOneRenterDBService = async (id) => {
    try {
        const result = await renterModel.findByIdAndDelete(id);
        return result;
    } catch (error) {
        throw new Error('Error deleting renter');
    }
}
