var dsl = require('../index')
  , base = require('./base')
  , build = require('./build')
  , riemann = require('./riemann')

module.exports = dsl()
    .include(base)
    .include(build)
    .include(riemann)
//   .step(riemandash())
//   .step(influxdb())
//   .step(grafana())



