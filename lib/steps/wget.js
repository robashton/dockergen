module.exports = function(opts) {
  var mkdir = ["mkdir -p", opts.dir].join(" ")
  var cd = ["cd", opts.dir].join(" ")
  var wget = ["wget",  opts.from].join(" ")
  return this.runBatch([mkdir, cd, wget])
}
