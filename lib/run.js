var BuildContext = require('./buildcontext')

module.exports = function(step) {
  var ctx = new BuildContext()
  step.buildInto(ctx)
  ctx.dump()
}
