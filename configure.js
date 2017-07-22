'use strict'

const cp = require('child_process')
const os = require('os')
const fs = require('fs')

let lookup = 'myip.opendns.com. resolver1.opendns.com'
let robots = { robots: 'http://localhost/robots.txt' }
const prefix = 'http://'
const txt = '/robots.txt'

function displayUsage () {
  console.log('Configure the external IP or domain for application.')
  console.log('\nUsage: node configure.js [domain/ip]')
  console.log('\nOptions:')
  console.log('\ndomain/ip: Domain or IP to use (if not detecting).')
  process.exit(0)
}

function writeConfig (args) {
  if (args.length === 2) {
    if (os.platform() === 'win32') {
      const r = cp.execSync(`nslookup ${lookup}`).toString()
      const ip = r.match(/\d{1,4}\.\d{1,4}\.\d{1,4}\.\d{1,4}$/gm)
      robots.robots = prefix + ip[1].trim() + txt
    } else {
      lookup = lookup.replace('.com.', '.com')
      lookup = lookup.replace('r', '@r')
      const ip = cp.execSync(`dig +short ${lookup}`).toString()
      robots.robots = prefix + ip.trim() + txt
    }
  } else if (args.length === 3) {
    if (args[2].search(/-h|--help/) !== -1) displayUsage()
    robots.robots = prefix + args[2] + txt
  }
  fs.writeFileSync('robots.json', JSON.stringify(robots, null, 0) + '\n')
}
writeConfig(process.argv)
