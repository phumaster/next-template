const routes = require('next-routes')
const routeNames = require('./config/routeNames')

module.exports = routes()
.add({
  name: routeNames.HOME,
  pattern: '/',
  page: 'index',
})
.add({
  name: routeNames.ARTICLE,
  pattern: '/article/:id',
  page: 'article',
})
