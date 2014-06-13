module.exports = function(cmd) {
  return this.step(function() { return "RUN " + cmd })
}
