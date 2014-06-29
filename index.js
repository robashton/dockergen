  var Step = require('./lib/step')

var mod = function(name) {
  return new Step().step(function(ctx) {
    ctx.instruction("\n###- " + name + " -###\n")
  })
}

var box = function(name) {
  return new Step().step(function(ctx) {
    ctx.packageName(name)
  })
}

module.exports = {
  module: mod,
  box: box,
  mustache: require('./lib/mustache')
}
