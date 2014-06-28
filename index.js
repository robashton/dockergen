  var Step = require('./lib/step')

module.exports = function(name) {
  return new Step().step(function(ctx) {
    ctx.instruction("\n###- " + name + " -###\n")
  })
}
