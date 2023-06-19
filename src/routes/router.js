const userRoutes = require('./user.route')
// const orderRoutes = require('./order.route')
// const orderErrorRoutes = require('./order-error.route')

function initRouter(app) {
    app.use('/api/users', userRoutes);
//     app.use('/api/orders', orderRoutes);
//     app.use('/api/order-errors', orderErrorRoutes);
}

module.exports = initRouter