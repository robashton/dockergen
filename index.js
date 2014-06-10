var mori = require('mori')
 ,  path = require('path')

function transformConfig(cfg, target) {
  // TODO: Take any functions and invoke them with cfg
  return target
}

function Step(cmd, steps) {
  this.exe = cmd || function() { console.log("nope"); return "nope" }
  this.steps = steps || mori.list()
}

Step.prototype.flatten = function() {
  return mori.flatten(mori.map(function(s) { return s.flatten() }, this.steps))
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
  return this.step("FROM " + source)
}

Step.prototype.env = function(opts) {
  // This is probably wrong
  // What we probably want is this to be a case of running docker
  // with these settings or with the appropriate command
  return this.step(function(cfg) {
    var applied = transformConfig(opts, cfg)
    return [ "ENV", opts.key, opts.value ].join(" ")
  })
}

Step.prototype.cmd = function(opts) {
  // This is probably wrong
  // What we probably want is this to be a case of running docker
  // With the appropriate command
  return this.step(function(cfg) {
    var applied = transformConfig(opts, cfg)
    return [ "CMD [\"", applied.target, "\"]"].join(" ")
  })
}

Step.prototype.run = function(cmd) {
  return this.step(function(cfg) { return "RUN " + cmd })
}

Step.prototype.runBatch = function(targets) {
  return this.run(["(", targets.join("; "), ")"].join(" "))
}

Step.prototype.add = function(opts) {
  console.log('Add', opts)
  // TODO: This needs expanding like everything else would
  return this.run("mkdir -p " + path.dirname(opts.destination)).step(function(cfg) {
    var applied = transformConfig(opts, cfg)
    return ["ADD", applied.source, applied.destination].join(" ")
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
  return this.step(function(cfg) {
    var applied = transformConfig(opts, cfg)
    return ["EXPOSE", applied.host].join(" ")
  })
}

Step.prototype.install = function(package) {
  return this.run("apt-get install -y " + package)
}

Step.prototype.wget = function(opts) {
  return this.step(function(cfg) {
    var applied = transformConfig(opts, cfg)
    var mkdir = ["mkdir -p", applied.dir].join(" ")
    var cd = ["cd", applied.dir].join(" ")
    var wget = ["wget",  applied.from].join(" ")
    return this.runBatch([mkdir, cd, wget])
  })
}

Step.prototype.tar = function(opts) {
  return this.step(function(cfg) {
    var applied = transformConfig(opts, cfg)
    var cd = ["cd", path.dirname(applied.file)].join(" ")
    var cmd = ["tar", applied.flags, path.basename(applied.file)].join(" ")
    return this.runBatch([cd, cmd])
  })
}

function dsl() {
  return new Step()
}

module.exports = dsl
