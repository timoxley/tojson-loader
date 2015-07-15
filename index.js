module.exports = function toJSONLoader(code) {
  return "module.exports = " + JSON.stringify(this.exec(code, this.resourcePath)) + "\n"
  return code
}

module.exports.pitch = function() {
  this.clearDependencies()
}

