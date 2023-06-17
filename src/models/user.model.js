const mysqlConnection = require("../core/db-connection");

class UserModel {

    constructor() {
        this.dbConnection = new mysqlConnection();
        if (!UserModel.instance) {
            UserModel.instance = this;
        }

        return UserModel.instance;
    }

    register(email, username, password, role='USER') {
        const sql = `INSERT INTO USERS_DISOFIC_UTILITIES (EMAIL, USERNAME, PASSWORD, ROLE) VALUES ('${email}', '${username}', '${password}', '${role}')`;
        console.log(sql);
        return this.dbConnection.query(sql);
    }

    getByEmail(email) {
        const sql = `SELECT * FROM USERS_DISOFIC_UTILITIES WHERE EMAIL = '${email}'`;
        return this.dbConnection.query(sql);
    }
}

module.exports = UserModel;
