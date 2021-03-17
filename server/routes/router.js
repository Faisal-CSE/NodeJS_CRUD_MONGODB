const express = require('express');
const route = express.Router();

const services = require('../services/render');
const userController = require('../controller/user_controller');

/**
*@description Root Route
*@method GET/
*/
route.get('/',services.homeRoutes);

/**
*@description for add user Route
*@method GET/add-user
*/
route.get('/add-user',services.addUserRoutes);

/**
*@description for update user Route
*@method GET/update-user
*/
route.get('/update-user',services.updateUserRoutes);


//API
route.get('/api/users',userController.find);
route.post('/api/users',userController.createUser);
route.put('/api/users/:id',userController.updateUser);
route.delete('/api/users/:id',userController.deleteUser);


module.exports = route;