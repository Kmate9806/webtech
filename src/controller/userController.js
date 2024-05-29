var userService = require('../webtech/service/userService');

var getDataControllerfn = async(req,res) => {
    var user = await userService.getDataFromDBService();
    res.send({"status":true,"data":user});
}

var createUserControllerFn = async(req,res) => {
    console.log(req.body);
    var status = await userService.createUserDBService(req.body);
    console.log("********");
    console.log(status);
    console.log("********");

    if(status){
        res.send({"status":true,"message":"User created successfully"});

    }else{
        res.send({"status":false,"message":"Error creating user"});

    }
}

module.exports = {
    getDataControllerfn,createUserControllerFn
}
