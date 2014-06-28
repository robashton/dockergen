var dsl = require('../index')
  , mustache = require('../mustache')

module.exports = function(opts) {
  opts.installpath = "/root/grafana/grafana-1.5.4"
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
          from: __dirname + "/runit/grafana",
          to: "/etc/service/grafana/run",
          transform: mustache(opts)
        })
        .add({
          from: __dirname + "/config/grafana/config.js",
          to: opts.installpath,
          transform: mustache(opts)
        })
    })
}
