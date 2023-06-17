const mysqlConnection = require("../core/db-connection");

class OrderModel {
    constructor () {
         this.dbConnection = new mysqlConnection()
         if (!OrderModel.instance) {
            OrderModel.instance = this;
        }

        return OrderModel.instance;
    }

    getOrders(body) {
        const fields = Object.values(body.fields).join(', ');
        const conditions = Object.entries(body.conditions).map(([key, value]) => `${key}='${value}'`).join(' AND ');
        const query = `SELECT ${fields} FROM PEDIDOTERMINADOP WHERE ${conditions}`;
        return this.dbConnection.query(query);
    }

}

module.exports = OrderModel;