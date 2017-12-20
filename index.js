'use strict'

module.exports = function toJSONLoader (code) {
  var result = this.exec(code, this.resourcePath)

  if ('function' !== typeof result) {
    return toJSON(result)
  }

  var callback = this.async()
  if (!callback) {
    if (result.sync) {
      if ('function' === typeof result.sync) {
        return toJSON(result.async())
      }
      else {
        return toJSON(result.async)
      }
    }
    
    this.emitError('Resource ' + this.resourcePath + ' needs async but it is not supported')
  }

  result(function asyncCallback (result) {
    callback(null, toJSON(result))
  })
}

module.exports.pitch = function pitch () {
  this.clearDependencies()
}

function toJSON (result) {
  return 'module.exports = ' + JSON.stringify(result) + '\n'
}
