const orderPortalRoutes = require('./order-portal.route')
const orderErrorsPortalRoutes = require('./order-error-portal.route')

function initRouter(app) {
    app.use('/api/orders-portal', orderPortalRoutes);
    app.use('/api/order-errors-portal', orderErrorsPortalRoutes);
}

module.exports = initRouter