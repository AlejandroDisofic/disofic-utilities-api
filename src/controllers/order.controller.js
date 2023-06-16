const mysqlConnection = require('../core/db-connection')

class OrdersController {

    constructor(db) {
        this.db = new mysqlConnection(db);
    }

    getOrders(req, res, next) {
        try {
            this.db.connect()
            .then(() => {
                const fields = Object.values(req.body.fields).join(', ');
                const conditions = Object.entries(req.body.conditions).map(([key, value]) => `${key}='${value}'`).join(' AND ');
                const query = `SELECT ${fields} FROM PEDIDOTERMINADOP WHERE ${conditions}`;
                return this.db.query(query);
            })
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