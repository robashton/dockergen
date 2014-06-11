var blah = require('./index')

var box = require('./examples/dashbox')

var data = ""
box.visit(function(step) {
  data += step() + "\n"
})
console.log(data)
