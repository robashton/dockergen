var dsl = require('../index')

module.exports = dsl()
              .wget({
                dir: "/root/grafana",
                from: "http://grafanarel.s3.amazonaws.com/grafana-1.5.4.tar.gz"
              })
              .tar({
                flags: "xzf",
                file: "/root/grafana/grafana-1.5.4.tar.gz"
              })
              .run("npm install -g http-server")
