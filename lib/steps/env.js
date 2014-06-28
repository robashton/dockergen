module.exports = function(key, value) {
  return this.step(function(ctx) {
    ctx.instruction([ "ENV", key, value ].join(" "))
  })
}
