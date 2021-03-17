var UserDb = require('../model/user_model');

//Get All users / Get single user
exports.find = (req,res)=>{
    if(req.query.id){
        //For Single User Info
        const uId = req.query.id;
        UserDb.findById(uId)
        .then(user=>{
            if(user){
                res.status(200).send(user);
            }
            else{
                res.status(404).send({
                    message: "No user found with this id: "+uId
                });
            }
        })
        .catch(err=>{
            res.status(500).send({
                message: err.message || "Error Occured while retriving ("+uId+") user information"
            })
        });
    }else{
        //For All User Info
        UserDb.find()
        .then(user=>{
            res.status(200).send(user)
        })
        .catch(err=>{
            res.status(500).send({
                message: err.message || "Error Occured while retriving user information"
            })
        });
    }
    
}

//Create and save new user
exports.createUser = (req, res)=>{
    //console.log("Test Data:")
    //console.log(req.body);

    //Validate request
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    //New user
    const user = new UserDb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    });

    //Store data in db
    user
        .save(user)
        .then(data =>{
            res.send(data)
        })
        .catch(err =>{
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            });
        });
}

//Create and save new user
exports.updateUser = (req, res)=>{
    if(!req.body){
        result = res.status(400).send({
            message: "Data to update can not be empty!"
        });
        return result;
    }

    //Get data from PUT request
    const uId = req.params.id; //Url Parameter
    UserDb.findByIdAndUpdate(uId, req.body, {useFindAndModify: false})
     .then(data=>{
        if(!data){
            res.status(404).send({
                "message" : "Can not update user with "+uId+". Maybe user not found!"
            });
        }else{
            //res.send(data);
            res.send({
                "message": "The information updated successfully."
            });
        }
     })
     .catch(err =>{
        res.status(500).send({
            "message": "Something went wrong!"
        })
     })

}

//Create and save new user
exports.deleteUser = (req, res)=>{
    const uId = req.params.id;

    UserDb.findByIdAndDelete(uId)
     .then(data=>{
        if(!data){
            res.status(404).send({
                "message" : "Can not delete user with "+uId+". Maybe user not found!"
            });
        }else{
            //res.send(data);
            res.send({
                "message": "The information deleted successfully."
            });
        }
     })
     .catch(err =>{
        res.status(500).send({
            "message": "Something went wrong when process!"
        });
     })
}