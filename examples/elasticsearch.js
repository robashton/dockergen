var dsl = require('../index')

module.exports = function(opts) {
  return dsl()
          .wget({
            dir: "/root/elasticsearch",
            from: "https://download.elasticsearch.org/elasticsearch/elasticsearch/elasticsearch-1.2.1.tar.gz"
          })
          .tar({
            flags: "xzf",
            file: "/root/elasticsearch/elasticsearch-1.2.1.tar.gz"
          })
          .run("cp -r /root/elasticsearch/elasticsearch-1.2.1 /opt/elasticsearch")
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
