const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

class UserController {
    maxAge = 3 * 24 * 60 * 60;

    constructor() {}

    register(req, res, next) {
        try {
            let { username, email, password, role } = req.body;

            bcrypt.hash(password, 10, (hashError, hash) => {
                if (hashError) {
                    return res.status(401).json({
                        message: hashError.message,
                        error: hashError,
                    });
                }

                return User
                    .register(email, username, hash, role)
                    .then((result) => {
                        res.status(200).json({
                            message: "Usuario registrado correctamente!",
                            user: result,
                        });
                    })
                    .catch((err) => {
                        console.error("Error en la creación de usuario");
                        console.error({
                            message: err.sqlMessage,
                            query: err.sql,
                        });
                        res.status(500).json({
                            code: 410, // Código de error (usuario ya existe)
                            error: err.sqlMessage,
                        });
                    });
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                error: "Error en la conexión a la base de datos",
            });
        }
    }

    login(req, res, next) {
        let { email, password } = req.body;
        User
            .getByEmail(email)
            .then((user) => {
                if (user.length === 0) {
                    return res.status(401).json({
                        code: 402,
                        error: 'No existe ese usuario.',
                    });
                }
                return bcrypt
                    .compare(password, user[0]["PASSWORD"])
                    .then((result) => {
                        if (!result) {
                            return res.status(401).json({
                                code: 401,
                                error: "Contraseña errónea",
                            });
                        }

                        const token = jwt.sign(
                            { email: user[0]["EMAIL"] },
                            config.server.token.secret,
                            { expiresIn: this.maxAge / 3 }
                        );

                        res.status(200).send({
                            message: "Usuario logueado correctamente!",
                            accessToken: token,
                        });
                    });
            })
            .catch((error) => {
                console.error("Error al comparar contraseñas:", error);
        });
    }
}

module.exports = UserController;
