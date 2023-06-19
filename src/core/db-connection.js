const mysql = require("mysql2");
const { Client } = require("ssh2");
const config = require("../config/config");
const Sequelize = require("sequelize");

const sequelizeConfig = {
  host: config.db.db_config.host,
  user: config.db.db_config.username,
  password: config.db.db_config.password,
  db: config.db.db_config.database.portal,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

const sequelize = new Sequelize(
  sequelizeConfig.db,
  sequelizeConfig.user,
  sequelizeConfig.password,
  {
    host: sequelizeConfig.host,
    dialect: sequelizeConfig.dialect,
    pool: {
      max: sequelizeConfig.pool.max,
      min: sequelizeConfig.pool.min,
      acquire: sequelizeConfig.pool.acquire,
      idle: sequelizeConfig.pool.idle,
    },
  }
);

const sequelizeConnection = async () => {
  return new Promise((resolve, reject) => {
    const sshClient = new Client();
    sshClient.on("ready", () => {
      sshClient
        .forwardOut(
          "127.0.0.1",
          4040,
          config.db.db_config.host,
          config.db.db_config.port,
          (err, stream) => {
            if (err) reject(err);

            const remotePort = stream.localPort;

            sequelize.options.port = remotePort;
            sequelize.options.dialectOptions = {
              socketPath: stream.socketPath,
            };

            sshClient.end();

            resolve(sequelize);
          }
        )
        .on('error', (err) => {
            reject(err);
        })
        .connect(config.db.ssh_config);
    });
  });
};

module.exports = sequelizeConnection;
