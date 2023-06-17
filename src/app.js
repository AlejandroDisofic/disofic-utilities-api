const http = require("http");
const express = require("express");
const initRouter = require("./routes/router");
const config = require("./config/config");

const mysqlConnection = require("./core/db-connection");

const OrderModel = require("./models/order.model")

app = express();

this.db = new mysqlConnection();
this.db.connect().then(() => {
    startServer();
    initializeModels();
})

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

        // res.header("Cache-Control", "no-cache");

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

    http.createServer(app).listen(config.server.port, () =>
        console.log(`Server is running on port ${config.server.port}`)
    );
};

const initializeModels = () => {
    new OrderModel();
}