module.exports = function(key, value) {
  return this.step(function(ctx) {
    ctx.runoption(["--env ", key, "=", value].join(""))
  })
}
