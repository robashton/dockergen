var path = require('path')
  , fs = require('fs')
  , derp = require('mkdirp')
  , config = require('./config')
  , Mustache = require('mustache')

var BuildContext = function() {
  this.files = []
  this.errors = []
  this.instructions = []
  this.options = []
  this.commands = []
}

BuildContext.prototype.instruction = function(i) {
  this.instructions.push(i)
}

BuildContext.prototype.packageName = function(name) {
  return this.name = name || this.name
}

BuildContext.prototype.runoption = function(option) {
  this.options.push(option)
}

BuildContext.prototype.command = function(name, exe) {
  this.commands.push({
    name: name,
    exe: exe
  })
}

BuildContext.prototype.file = function(source, fn) {
  var dest = path.relative(process.cwd(), source)
  dest = path.join(config.output, "files", dest)
  this.files.push({ source: source, fn: fn, dest: dest})
  var res = path.relative(config.output, dest)
  return res
}

BuildContext.prototype.dump = function() {
  var ctx = this
  this.ensureDir()
  this.dumpErrors()
  this.dumpFiles(0, function(err) {
    if(err) throw err
    ctx.dumpDocker()
    ctx.dumpScripts()
  })
}

BuildContext.prototype.dumpErrors = function() {
  if(this.errors.length === 0) return false
  for(var i = 0 ; i < this.errors.length; i++) {
    console.log(this.errors[i])
  }
  return true
}

BuildContext.prototype.dumpFiles = function(index, done) {
  var ctx = this
  if(index >= this.files.length) return done()
  var file = this.files[index++]
  var dirname = path.dirname(file.dest)
  derp(dirname, function(err) {
    if(err) return done(err)
    if(file.fn) {
      var output = file.fn()
      fs.writeFileSync(file.dest, output, "utf8")
      return ctx.dumpFiles(index, done)
    }
    var is = fs.createReadStream(file.source)
    var os = fs.createWriteStream(file.dest);
    is.on('end', function(err) {
      if(err) return done(err)
      return ctx.dumpFiles(index, done)
    })
    is.pipe(os)
  })
}

BuildContext.prototype.dumpDocker = function() {
  fs.writeFileSync(config.output + "/Dockerfile", this.instructions.join("\n"), "utf8")
}

BuildContext.prototype.dumpScripts = function() {
  var optionString = this.options.join(" ")
  var template = fs.readFileSync(__dirname + "/templates/run", "utf8")
  var runscript = Mustache.render(template, this)
  fs.writeFileSync(config.output + "/run", runscript, "utf8")
}

BuildContext.prototype.ensureDir = function() {
  if(!fs.existsSync(config.output)) {
    fs.mkdirSync(config.output)
  }
}
module.exports = BuildContext
