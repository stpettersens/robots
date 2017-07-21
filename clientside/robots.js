/* global $ */
'use strict'
window.onload = function () {
  const host = window.location.hostname
  $('meta[name=ownrobots').attr('content', 'http://' + host + '/robots.txt')
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
