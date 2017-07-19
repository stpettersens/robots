'use strict'
/*
Robots parser service written with Rust and JavaScript (Node.js + Express.js + Handlebars.js).
Copyright (c) 2017 Sam Saint-Pettersen.

Released under the MIT License.
*/
const request = require('request')

module.exports.parseRobotsUrl = function (url, callback) {
  request(url, function (err, res, data) {
    if (err) { console.log(err) }
    callback(data)
  })
}

module.exports.parseRobotData = function (url, robots, callback) {
  const robotHandler = 'http://localhost:1010/'
  request.post(robotHandler, { form: {id: 'foo', url: url, lines: robots} },
  function (err, res, data) {
    if (err) { console.log(err) }
    callback(data)
  })
}
