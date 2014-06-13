module.exports = function(opts) {
  // This is probably wrong
  // What we probably want is this to be a case of running docker
  // With the appropriate command
  return this.step(function() {
    return [ "CMD [\"", opts.target, "\"]"].join(" ")
  })
}
