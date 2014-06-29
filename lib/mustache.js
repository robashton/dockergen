var mustache = require('mustache')

module.exports = function(opts) {
  return function(ctx, input) {
    return mustache.render(input, opts)
  }
}
