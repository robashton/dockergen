module.exports = function(opts) {
  // There is no command for this
  return this.step(function(ctx) {
    ctx.instruction(["EXPOSE", opts.host].join(" "))
  })
}
