var dsl = require('../index')
  , mustache = require('../mustache')

module.exports = function(opts) {
  return dsl()
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
      c.add({
        from: "runit/elasticsearch",
        to: "/etc/service/elasticsearch/run"
      })
      .add({
        from: "config/elasticsearch/elasticsearch.yml",
        to: "/opt/elasticsearch/config",
        transform: mustache(opts)
      })
    })
}
