// const mysqlConnection = require("../core/db-connection");

// class OrderErrorModel {
//     constructor () {
//          this.dbConnection = new mysqlConnection()
//          if (!OrderErrorModel.instance) {
//             OrderErrorModel.instance = this;
//         }

//         return OrderErrorModel.instance;
//     }

//     getOrderErrors(body) {
//         const fields = Object.values(body.fields).join(', ');
//         const conditions = Object.entries(body.conditions).map(([key, value]) => `${key}='${value}'`).join(' AND ');
//         const query = `SELECT ${fields} FROM ERRORES_INSERCION_PEDIDOS_ODOO WHERE ${conditions}`;
//         return this.dbConnection.query(query);
//     }

// }

// module.exports = OrderErrorModel;