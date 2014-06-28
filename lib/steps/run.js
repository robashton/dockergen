module.exports = function(cmd) {
  return this.step(function(ctx) { ctx.instruction("RUN " + cmd) })
}
