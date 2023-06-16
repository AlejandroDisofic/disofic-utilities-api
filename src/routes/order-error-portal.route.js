const express = require('express');
const OrderErrorsController = require('../controllers/order-errors.controller');

const router = express.Router();
const controller = new OrderErrorsController('portal');

router.post('/get-errors', controller.getOrders.bind(controller));

module.exports = router;