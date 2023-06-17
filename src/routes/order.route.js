const express = require('express');
const OrdersController = require('../controllers/order.controller');

const router = express.Router();
const controller = new OrdersController();

router.post('/get-orders', controller.getOrders.bind(controller));

module.exports = router;