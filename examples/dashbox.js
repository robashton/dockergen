var dsl = require('../index')
  , base = require('./base')
  , build = require('./build')
  , riemann = require('./riemann')
  , riemanndash = require('./riemann-dash')
  , influx = require('./influx')
  , grafana = require('./grafana')
  , elasticsearch = require('./elasticsearch')

module.exports = dsl()
    .include(base)
    .include(build)
    .include(riemann({
      listen: 8080
    }))
    .include(riemanndash({
      listen: 4567
    }))
    .include(influx({

    }))
    .include(grafana({

    }))
    .include(elasticsearch({

    }))
