'use strict'

const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const parser = require('./lib/parser')

let app = express()
app.engine('.hbs', exphbs({extname: 'hbs', defaultLayout: 'main'}))
app.set('view engine', '.hbs')
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function (req, res, next) {
  res.render('index')
})

app.get('/submit', function (req, res) {
  parser.parseRobotsUrl(req.query.url, function (robots) {
    parser.parseRobotData(req.query.url, robots, function (data) {
      res.send(data)
    })
  })
})

console.info('robots frontend service listening on :8075 ("BOTS")')
app.listen(8075)
