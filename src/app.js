const http = require("http");
const express = require("express");
const initRouter = require("./routes/router");
const cors = require("cors");
const config = require("./config/config");

const sequelizeConnection = require("./core/db-connection");

app = express();

const startServer = () => {
    app.use((req, res, next) => {
        console.log(
            `Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`
        );
        res.on("finish", () => {
            console.log(
                `Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
            );
        });
        next();
    });

    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    //Rules
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Authorization, Origin, X-Requested-With, Content-Type, Accept"
        );

        if (req.method == "OPTIONS") {
            res.header(
                "Access-Control-Allow-Methods",
                "PUT, POST, PATCH, DELETE, GET"
            );
            return res.status(200).json({});
        }

        next();
    });

    // Routes
    initRouter(app);

    //HealthCheck
    app.get("/ping", (req, res, next) =>
        res.status(200).json({ message: "pong" })
    );

    app.use((req, res, next) => {
        const error = new Error("not found");
        console.error(error);
        return res.status(404).json({ message: error.message });
    });

    sequelizeConnection().then(sequelize => {
        return sequelize.sync()
    }).then(result => {
        console.log(result)
        http.createServer(app).listen(config.server.port, () =>
        console.log(`Server is running on port ${config.server.port}`)
    );
    })
    .catch(error => {
        console.log(error)
    });
};

startServer();