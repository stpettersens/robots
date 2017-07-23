/* global $ */
'use strict'
function submitRobots () {
  var sr = $('meta[name=self-robots]').attr('content')
  var url = $('#url').val()
  if (url.search(/\/robots.txt$/) !== -1) {
    $.get('/submit?url=' + url, function (data) {
      if (url === sr) {
        window.alert('Looking for /robots.txt on this site. How meta...')
      }
      window.alert(data)
    })
  } else {
    window.alert('Provided URL should end with "/robots.txt".')
  }
}
// Invoked for standard validation; removed in production:
submitRobots()
