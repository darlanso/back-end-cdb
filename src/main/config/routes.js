const router = require('express').Router()
const fg = require('fast-glob')

module.exports = app => {
  app.get('/', function(req, res) {
    res.redirect(301,'https://github.com/gandalf06/back-end-cdb')
  })
  app.use('/api', router)
  fg.sync('**/src/main/routes/**routes.js').forEach(file => require(`../../../${file}`)(router))
}
