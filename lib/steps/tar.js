var path = require('path')

module.exports = function(opts) {
  var cd = ["cd", path.dirname(opts.file)].join(" ")
  var cmd = ["tar", opts.flags, path.basename(opts.file)].join(" ")
  return this.runBatch([cd, cmd])
}
