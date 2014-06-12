var dsl = require('../index')

module.exports = dsl()
  .wget({ dir: "/root/influx",
          from: "http://s3.amazonaws.com/influxdb/influxdb_latest_amd64.deb"})
  .run("dpkg -i /root/influx/influxdb_latest_amd64.deb")
