const express = require('express');
const OrderErrorController = require('../controllers/order-error.controller');

const router = express.Router();
const controller = new OrderErrorController();

router.get('/get-errors', controller.getOrderErrors.bind(controller));

module.exports = router;