const dashboardRoutes = require('./dashboard.route.js')
const systemConfig = require('../../config/system.js')
const productRoutes = require('./product.route.js')
const trashRoutes = require('./trash.route.js')
const PATH_ADMIN = systemConfig.prefixAdmin

module.exports = (app) => {
  app.use((PATH_ADMIN), dashboardRoutes)
  app.use((PATH_ADMIN + '/products'), productRoutes)
  app.use((PATH_ADMIN + '/trash'), trashRoutes)
}