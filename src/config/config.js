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

const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'coolIssuer';
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || 'superencryptedsecret';
const SERVER_TOKEN_EXPIRETIME = 3600;
const SERVER_REFRESH_TOKEN_EXPIRETIME = 86400;

const token = {
    expireTime: SERVER_TOKEN_EXPIRETIME,
    refreshTime: SERVER_REFRESH_TOKEN_EXPIRETIME,
    issuer: SERVER_TOKEN_ISSUER,
    secret: SERVER_TOKEN_SECRET
}

const config = {
    db: {
        ssh_config: sshConfig,
        db_config: dbConfig,
    },
    server: {
        port: process.env.SERVER_PORT,
        token: token
    }
}

module.exports = config