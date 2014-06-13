module.exports = function(opts) {
  // There is no command for this
  return this.step(function() {
    return ["EXPOSE", opts.host].join(" ")
  })
}
