const { Router } = require('express');
const express = require('express');
const newOrderController = require('./controller/newOrderController');
const newUsercontroller = require('./controller/newUserController');

const routes = express.Router();

routes.get('/users/', newUsercontroller.index);
routes.get('/users/:id', newUsercontroller.searchSpecific);
routes.post('/users', newUsercontroller.create);
routes.put('/users/:id', newUsercontroller.editUser);
routes.delete('/users/:id', newUsercontroller.deleteUser);

routes.get('/orders', newOrderController.showAll)
routes.get('/orders?:id', newOrderController.showSpecific)
routes.post('/orders', newOrderController.create)


module.exports = routes;