var path = require('path')
  , fs = require('fs')
  , derp = require('mkdirp')

var files = []
  , errors = []
  , dockerfile = ""

var BuildContext = function() {
  this.files = []
  this.errors = []
  this.instructions = []
}

BuildContext.prototype.instruction = function(i) {
  this.instructions.push(i)
}

BuildContext.prototype.file = function(source, fn) {
  var dest = path.relative(process.cwd(), source)
  dest = path.join(".docker", "files", dest)
  this.files.push({ source: source, fn: fn, dest: dest})
  var res = path.relative(".docker", dest)
  return res
}

BuildContext.prototype.dump = function() {
  var ctx = this
  this.ensureDir()
  this.dumpErrors()
  this.dumpFiles(0, function(err) {
    if(err) throw err
    ctx.dumpDocker()
  })
}

BuildContext.prototype.dumpErrors = function() {
  if(errors.length === 0) return false
  for(var i = 0 ; i < errors.length; i++) {
    console.log(errors[i])
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
  fs.writeFileSync(".docker/Dockerfile", this.instructions.join("\n"), "utf8")
}

BuildContext.prototype.ensureDir = function() {
  if(!fs.existsSync(".docker")) {
    fs.mkdirSync(".docker")
  }
}
module.exports = BuildContext
