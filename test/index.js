var fs = require('fs')
var path = require('path')
var exec = require('child_process').exec
var test = require('tape')

var TEST_DIR = path.join(__dirname, '/simple')
var TEST_FILE = path.join(TEST_DIR, '/build.js')

test('setup', function (t) {
  fs.unlink(TEST_FILE, function (err) {
    err // noop. ignore err
    t.end()
  })
})

test('tojson-loader ', function (t) {
  exec('webpack --bail', {cwd: TEST_DIR}, function (err, stdout, stderr) {
    t.ifError(err)
    var build = fs.readFileSync(TEST_FILE, 'utf8')
    t.ok(build.indexOf('# tojson-loader') !== -1, 'contains header from readme')
    t.ok(build.indexOf('require(\'tape\')') === -1, 'does not contain dependencies')
    t.end()
  })
})
