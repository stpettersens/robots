'use strict'
/*
Robots parser service written with Rust and JavaScript (Node.js + Express.js + Handlebars.js).
Copyright (c) 2017 Sam Saint-Pettersen.

Released under the MIT License.
*/
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

app.get('/robots.txt', function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  let robots = []
  robots.push('User-agent: *')
  robots.push('Disallow: /')
  robots.push('\n')
  res.send(robots.join('\n'))
})

app.get('/submit', function (req, res) {
  parser.parseRobotsUrl(req.query.url, function (robots) {
    parser.parseRobotData(req.query.url, robots, function (data) {
      res.setHeader('Content-Type', 'text/plain') // -> application/json
      res.send(data)
    })
  })
})

console.info('robots frontend service listening on :8075 ("BOTS")')
app.listen(8075)
