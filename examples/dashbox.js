var docker = require('../index')
  , base = require('./base')
  , build = require('./build')
  , riemann = require('./riemann')
  , riemanndash = require('./riemann-dash')
  , influx = require('./influx')
  , grafana = require('./grafana')
  , elasticsearch = require('./elasticsearch')

var config = {
  influxdb: "riemann",
  influxport: 8086,
  riemanndashport: 4567,
  influxadminport: 8083,
  influxapiport: 8086,
  elasticsearchport: 9200
}

docker("dashbox")
      .include(base)
      .include(build)
      .include(riemann({
        influxhost: "127.0.0.1",
        influxdb: config.influxdb,
        influxport: config.influxport
      }))
      .include(riemanndash({
        port: config.riemanndashport
      }))
      .include(influx({
        adminport: config.influxadminport,
        apiport: config.influxapiport
      }))
      .include(grafana({
        elasticsearchport: config.elasticsearchport,
        influxdb: config.infuxdb,
        influxport: config.influxapiport
      }))
      .include(elasticsearch({
        port: config.elasticsearchport
  })).execute()
