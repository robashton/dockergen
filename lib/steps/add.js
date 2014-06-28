var path = require('path')
  , fs = require('fs')

module.exports = function(opts) {
  return this.run("mkdir -p " + path.dirname(opts.to))
             .step(function(ctx) {
               if(!fs.existsSync(opts.from))
                  ctx.error("File doesn't exist "  + opts.from)
               ctx.instruction(["ADD", opts.from, opts.to].join(" "))
              })
}
