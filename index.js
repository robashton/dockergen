  var Step = require('./lib/step')

function dsl(name) {
  return new Step().step(function(ctx) {
    ctx.instruction("\n###- " + name + " -###\n")
  })
}

module.exports = dsl
