const axios = require('axios'); //axios allow to request

exports.homeRoutes = (req,res)=>{
    //Make a get request to /api/users
    axios.get("http://localhost:3000/api/users")
    .then(function(response){
        //console.log(response);
        //console.log(response.data);
        res.render('index',{users: response.data});
    })
    .catch(err=>{
        res.send(err);
    })
    //res.render('index',{users: "Faisal porag"}); //Pass the users data to index file
};

exports.addUserRoutes = (req,res)=>{
    res.render('add_user');
};

exports.updateUserRoutes = (req,res)=>{
    axios.get("http://localhost:3000/api/users",{params: {id: req.query.id}})
    .then(function(userData){
        res.render('update_user', {user: userData.data});
    })
    .catch(err=>{
        res.send(err);
    })
};
