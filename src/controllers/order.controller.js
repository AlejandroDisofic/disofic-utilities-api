const Order = require('../models/order.model')

class OrdersController {

    constructor() {
        this.orderModel = new Order;
    }

    getOrders(req, res, next) {
        try {
            this.orderModel.getOrders(req.body)
            .then(results => {
                res.status(200).json(results)
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error en la conexión a la base de datos' });
        }
    }
}

module.exports = OrdersController;