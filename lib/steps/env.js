module.exports = function(key, value) {
  // This is probably wrong
  // What we probably want is this to be a case of running docker
  // with these settings or with the appropriate command
  return this.step(function() {
    return [ "ENV", key, value ].join(" ")
  })
}
