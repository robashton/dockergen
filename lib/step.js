var mori = require('mori')
 ,  fs = require('fs')

function Step(cmd, steps) {
  this.exe = cmd || function() { return "" }
  this.steps = steps || mori.vector()
}

Step.prototype.visit = function(cb) {
  cb(this.exe || function() { return ""})
  mori.each(this.steps, function(s) {  s.visit(cb) })
}

Step.prototype.step = function(cmd) {
  var other = cmd
  if(typeof cmd === 'string' || cmd instanceof String)
    other = new Step(function() { return cmd })
  return new Step(this.exe, mori.conj(this.steps, new Step(other)))
}

Step.prototype.include = function(step) {
  return new Step(this.exe, mori.conj(this.steps, step))
}

Step.prototype.from = function(source) {
  // This is probably wrong
  // What we probably want is this to be a case of running docker
  // from a base image
  return this.step(function() { return "FROM " + source })
}

Step.prototype.config = function(cb) {
  return this // These need to be post-build steps
}

fs.readdirSync(__dirname + "/steps").forEach(function(file) {
  var name = file.substr(0, file.indexOf('.'))
  Step.prototype[name] = require('./steps/' + name)
})


module.exports = Step
