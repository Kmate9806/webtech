
var userModel = require('../../model/userModel');

module.exports.getDataFromDBService = () => {

        return new Promise(function checkURL(resolve, reject) {

            userModel.find({},function returnData(error,result){

                if(error){
                    reject(false);
                }else{
                    resolve(result);
                }
            });
        });

}

module.exports.createUserDBService = (userDetails) => {

    return new Promise(function myFn(resolve, reject) {
        var userModelData = new userModel();
        userDetails.id = userDetails.id;
        userModelData.firstName = userDetails.firstName;
        userModelData.lastName = userDetails.lastName;
        userModelData.address = userDetails.address;
        userModelData.tel = userDetails.tel;
        userModelData.email = userDetails.email;

        userModelData.save(function resultHandle(error,result){
            if(error){
                reject(false);
            }else 
            resolve(true);
        });
    });
}