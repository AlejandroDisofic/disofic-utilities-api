const OrderError = require('../models/order-error.model')

class OrderErrorController {

    constructor() {
        this.orderErrorModel = new OrderError();
    }

    getOrderErrors(req, res, next) {
        try {
            const request = {
                fields: ['*'],
                conditions: {
                    PEDIDO: req.query['pedido']
                }
            }
            this.orderErrorModel.getOrderErrors(request)
            .then(results => {
                res.status(200).json(results)
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error en la conexión a la base de datos' });
        }
    }
}

module.exports = OrderErrorController;