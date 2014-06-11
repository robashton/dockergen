var mori = require('mori')
 ,  path = require('path')

function transformConfig(opts, cfg) {
  // TODO: Take any functions and invoke them with cfg
  return opts
}

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

Step.prototype.env = function(key, value) {
  // This is probably wrong
  // What we probably want is this to be a case of running docker
  // with these settings or with the appropriate command
  return this.step(function() {
    return [ "ENV", key, value ].join(" ")
  })
}

Step.prototype.cmd = function(opts) {
  // This is probably wrong
  // What we probably want is this to be a case of running docker
  // With the appropriate command
  return this.step(function() {
    return [ "CMD [\"", opts.target, "\"]"].join(" ")
  })
}

Step.prototype.run = function(cmd) {
  return this.step(function() { return "RUN " + cmd })
}

Step.prototype.runBatch = function(targets) {
  return this.run(["(", targets.join("; "), ")"].join(" "))
}

Step.prototype.add = function(opts) {
  return this.run("mkdir -p " + path.dirname(opts.destination))
             .step(function(cfg) {
                return ["ADD", opts.source, opts.destination].join(" ")
              })
}

Step.prototype.template = function(opts) {
  return this.step(function(cfg) {
    // Maybe even do this
    // Template to _work/env?/
    // Do an ADD from that tmp
  })
}

Step.prototype.expose = function(opts) {
  // There is no command for this
  return this.step(function() {
    return ["EXPOSE", opts.host].join(" ")
  })
}

Step.prototype.install = function(package) {
  return this.run("apt-get install -y " + package)
}

Step.prototype.wget = function(opts) {
  var mkdir = ["mkdir -p", opts.dir].join(" ")
  var cd = ["cd", opts.dir].join(" ")
  var wget = ["wget",  opts.from].join(" ")
  return this.runBatch([mkdir, cd, wget])
}

Step.prototype.tar = function(opts) {
  var cd = ["cd", path.dirname(opts.file)].join(" ")
  var cmd = ["tar", opts.flags, path.basename(opts.file)].join(" ")
  return this.runBatch([cd, cmd])
}

function dsl() {
  return new Step()
}

module.exports = dsl
