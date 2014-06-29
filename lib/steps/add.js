var path = require('path')
  , fs = require('fs')

module.exports = function(opts) {
  return this.run("mkdir -p " + path.dirname(opts.to))
             .step(function(ctx) {
               if(!fs.existsSync(opts.from))
                  ctx.error("File doesn't exist "  + opts.from)
                var resolved = opts.transform ?
                                  ctx.file(opts.from, function() {
                                     return opts.transform(ctx, fs.readFileSync(opts.from, "utf8"))
                                  }) : ctx.file(opts.from)
                ctx.instruction(["ADD", resolved, opts.to].join(" "))

                if(opts.mode) {
                  ctx.instruction(["RUN", "chmod", opts.mode, opts.to].join(" "))
                }
              })
}
