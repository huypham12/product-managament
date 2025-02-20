const dashboardRoutes = require('./dashboard.route.js')
const systemConfig = require('../../config/system.js')
const PATH_ADMIN = systemConfig.prefixAdmin
module.exports = (app) => {
  app.use((PATH_ADMIN + '/dashboard'), dashboardRoutes)
}