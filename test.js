var blah = require('./index')
  , fs = require('fs')

var box = require('./examples/dashbox')

var files = []
  , errors = []
  , dockerfile = ""

var BuildContext = {
  instruction: function(text) {
    dockerfile += text + "\n"
  },
  file: function(fn) {
    files.push(fn)
  },
  error: function(msg) {
    errors.push(msg)
  }
}

box.buildInto(BuildContext)

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

fs.writeFileSync(".docker/Dockerfile", dockerfile, "utf8")



