// data.json.js
// can use serverside-only dependencies
var fs = require('fs')

// any other dependencies that are only used in here won't be included in bundle
var tape = require('tape') // some random dependency

// whatever the value of module.exports is will be serialised to JSON
module.exports = fs.readFileSync(__dirname + '/../../Readme.md', 'utf8')
