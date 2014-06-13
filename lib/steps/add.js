var path = require('path')

module.exports = function(opts) {
  return this.run("mkdir -p " + path.dirname(opts.destination))
             .step(function(cfg) {
                return ["ADD", opts.source, opts.destination].join(" ")
              })
}
