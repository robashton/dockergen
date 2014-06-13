var mustache = require('mustache')

module.exports = function(opts) {
  return function(input) {
    return mustache.render(opts, input)
  }
}
