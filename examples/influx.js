var dsl = require('../index')
  , transform = require('../mustache')

module.exports = function(opts) {
  return dsl()
  .wget({ dir: "/root/influx",
          from: "http://s3.amazonaws.com/influxdb/influxdb_latest_amd64.deb"})
  .run("dpkg -i /root/influx/influxdb_latest_amd64.deb")
  .config(function(c) {
    c.add({
      from: "runit/influxdb",
      to: "/etc/service/influxdb/run"
    })
    .add({
      from: "config/influxdb/config.toml",
      to: "/opt/influxdb/shared/config.toml",
      transform: mustache(opts)
    })
  })
}
