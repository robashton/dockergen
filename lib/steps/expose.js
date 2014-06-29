module.exports = function(port) {
  return this.step(function(ctx) {
    ctx.runoption(["--expose", port].join("="))
  })
}
