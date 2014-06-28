var dsl = require('../index')
  , mustache = require('../mustache')

module.exports = function(opts) {
  return dsl("grafana")
    .wget({
      dir: "/root/grafana",
      from: "http://grafanarel.s3.amazonaws.com/grafana-1.5.4.tar.gz"
    })
    .tar({
      flags: "xzf",
      file: "/root/grafana/grafana-1.5.4.tar.gz"
    })
    .run("npm install -g http-server")
    .config(function(c) {
      return c.add({
          from: "runit/grafana",
          to: "/etc/service/grafana/run"
        })
        .add({
          from: "config/grafana/config.js",
          to: "/root/grafana/grafana-1.5.4",
          transform: mustache(opts)
        })
    })
}
