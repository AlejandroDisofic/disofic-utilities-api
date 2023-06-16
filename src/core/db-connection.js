const mysql = require('mysql2')
const { Client } = require("ssh2");
const config = require("../config/config");

class mysqlConnection {
    constructor(db) {
        if (!mysqlConnection.instance) {
            this.db=db
            this.sshClient = new Client();
            mysqlConnection.instance = this;
        }

        return mysqlConnection.instance;
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.sshClient.on('ready', () => {
                this.sshClient.forwardOut(
                    '127.0.0.1',
                    4040,
                    config.db_config.host,
                    config.db_config.port,
                    (err, stream) => {
                        if(err) reject(err)

                        this.connection = mysql.createConnection({
                            host: config.db_config.host,
                            port: config.db_config.port,
                            user: config.db_config.username,
                            password: config.db_config.password,
                            database: config.db_config.database[this.db],
                            stream: stream
                        });
                        
                        this.connection.connect((err) => {
                            if (err) {
                                console.error("Error al conectar a la base de datos:", err)
                                reject(err);
                            } else {
                                resolve();
                            }
                        });
                    }
                )
            })
            .on('error', (err) => {
                reject(err);
            })
            .connect(config.ssh_config)
        })
    }

    query(query) {
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

}

module.exports = mysqlConnection;