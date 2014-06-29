module.exports = function(name, target) {
  return this.step(function(ctx) {
    ctx.command(name, target)
  })
}
