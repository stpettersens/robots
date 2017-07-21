/* global $ */
'use strict'
window.onload = function () {
  $('meta[name=ownrobots').attr
  ('content', 'http://' + window.location.hostname + '/robots.txt')
}
function submitRobots () {
  var url = $('#url').val()
  if (url.search(/\/robots.txt$/) !== -1) {
    $.get('/submit?url=' + url, function (data) {
      window.alert(data)
    })
  } else {
    window.alert('Provided URL should end with "/robots.txt".')
  }
}
// Invoked for standard validation; removed in production:
submitRobots()
