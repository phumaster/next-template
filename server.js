const next = require('next')
const express = require('express')
const routes = require('./routes')
const app = next({dev: process.env.NODE_ENV !== 'production'})
const { join } = require('path')
const { parse } = require('url')

const server = express()

const customRequestHandle = ({req, res, route, query}) => {
  app.render(req, res, route.page, query)
};

const handler = routes.getRequestHandler(app, customRequestHandle)

server.get('/service-worker.js', (req, res) => {
  const parsedUrl = parse(req.url, true)
  const { pathname } = parsedUrl
  const filePath = join(__dirname, '.next', pathname)

  app.serveStatic(req, res, filePath)
})

server.use(handler)

app.prepare().then(() => {
  server.listen(3000)
})
