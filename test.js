var blah = require('./index')
  , fs = require('fs')
  , path = require('path')
  , util = require('util')
  , derp = require('mkdirp')

var box = require('./examples/dashbox')

var files = []
  , errors = []
  , dockerfile = ""

var BuildContext = {
  instruction: function(text) {
    dockerfile += text + "\n"
  },
  file: function(source, fn) {
    var dest = path.relative(process.cwd(), source)
    dest = path.join(".docker", "files", dest)
    files.push({ source: source, fn: fn, dest: dest})
    var res = path.relative(".docker", dest)
    return res
  },
  error: function(msg) {
    errors.push(msg)
  }
}

box.buildInto(BuildContext)

if(errors.length > 0) {
  for(var i = 0 ; i < errors.length; i++) {
    console.log(errors[i])
  }
  return
}

//var data = ""
//var next = box.process(function(step) {
//  data += step() + "\n"
//})
//
//next.process(function(step) {
//  data += step() + "\n"
//})
//

if(!fs.existsSync(".docker")) {
  fs.mkdirSync(".docker")
}


function processFiles(files) {
  if(files.length === 0) return
  var file = files.shift()
  var dirname = path.dirname(file.dest)
  console.log('Derping', dirname)
  derp(dirname, function(err) {
    if(err) return console.error(err)
    if(file.fn) {
      var output = file.fn()
      fs.writeFileSync(file.dest, output, "utf8")
      processFiles(files)
    } else {
      var is = fs.createReadStream(file.source)
      var os = fs.createWriteStream(file.dest);
      is.on('end', function(err) {
        if(err) return console.error(err)
        processFiles(files)
      })
      is.pipe(os)
    }
  })
}

processFiles(files)

fs.writeFileSync(".docker/Dockerfile", dockerfile, "utf8")
