// data.json.js

// can use serverside-only dependencies
var fs = require('fs')
var path = require('path')
var readme = fs.readFileSync(path.join(__dirname, '/../../Readme.md'), 'utf8')
readme = readme.split('\n')[0] // (just grab header for demo)

// any other dependencies that are only used in here won't be included in bundle
var tape = require('tape') // some random dependency

// whatever the value of module.exports is will be serialised to JSON
module.exports = {
  readme: readme,
  tape: tape, // tape happens to be a function so it won't serialise.
  random: Math.random() // will be fixed to whatever value is generated at compile-time
}
