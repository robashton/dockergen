var blah = require('./index')

var box = require('./examples/dashbox')

var data = ""
var next = box.process(function(step) {
  data += step() + "\n"
})

next.process(function(step) {
  data += step() + "\n"
})

console.log(data)
