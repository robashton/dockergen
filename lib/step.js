var mori = require('mori')
  , fs = require('fs')
  , run = require('./run')

function Step(cmd, steps, cfg) {
  this.exe = cmd || function() { return "" }
  this.steps = steps || mori.vector()
  this.cfg = cfg || function(c) { return c }
}

Step.prototype.execute = function() {
  run(this)
}

Step.prototype.buildInto = function(ctx) {
  var config = this.process(null, ctx)
  ctx.instruction("\n###- CONFIG APPLICATION -###\n")
  config.process(null, ctx)
}


Step.prototype.process = function(config, ctx) {
  // Start off with an empty step or the config so far
  config = this.cfg(config || new Step())

  // Execute ourself
  this.exe(ctx)

  // Execute our children, carry on generating the config step
  mori.each(this.steps, function(s) {  config = s.process(config, ctx) })

  // Return the built up config step
  return config
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
  return new Step(this.exe, this.steps, cb)
}

fs.readdirSync(__dirname + "/steps").forEach(function(file) {
  var name = file.substr(0, file.indexOf('.'))
  Step.prototype[name] = require('./steps/' + name)
})


module.exports = Step
