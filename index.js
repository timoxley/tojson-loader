'use strict'

module.exports = function toJSONLoader (code) {
  return 'module.exports = ' + JSON.stringify(this.exec(code, this.resourcePath)) + '\n'
}

module.exports.pitch = function pitch () {
  this.clearDependencies()
}
