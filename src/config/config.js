const dotenv = require('dotenv');

dotenv.config()

const sshConfig = {
    host: process.env.WEB_SSH_HOST,
    port: process.env.WEB_SSH_PORT,
    username: process.env.WEB_SSH_USER,
    password: process.env.WEB_SSH_PASSWORD,
};

const dbConfig = {
    host: process.env.WEB_HOST,
    port: process.env.WEB_PORT,
    username: process.env.WEB_USER,
    password: process.env.WEB_PASSWORD,
    database: {
        portal: process.env.PORTAL_DB,
        disofic: process.env.DSF_DB,
        desordena: process.env.DESORDENA_DB,
    }
};

const config = {
    ssh_config: sshConfig,
    db_config: dbConfig,
    server: {
        port: process.env.SERVER_PORT
    }
}

module.exports = config