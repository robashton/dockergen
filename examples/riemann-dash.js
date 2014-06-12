var dsl = require('../index')

// NOTE: Half of this comes from the bash scripts on the base image
// We really need a non version of this
module.exports = dsl()
  .run("/build/ruby1.9.sh")
  .run("/build/ruby-switch --set ruby1.9.1")
  .run("/build/devheaders.sh")
  .run("gem install riemann-client riemann-tools riemann-dash")


