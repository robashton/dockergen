module.exports = function(opts) {
  return this.step(function(ctx) {
    ctx.instruction([ "CMD [\"", opts.target, "\"]"].join(" "))
  })
}
