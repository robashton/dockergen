var dsl = require('../index')
  , mustache = require('../mustache')

module.exports = function(opts) {
  opts.installpath = opts.installpath || "/opt/elasticsearch"
  return dsl("elasticsearch")
          .wget({
            dir: "/root/elasticsearch",
            from: "https://download.elasticsearch.org/elasticsearch/elasticsearch/elasticsearch-1.2.1.tar.gz"
          })
          .tar({
            flags: "xzf",
            file: "/root/elasticsearch/elasticsearch-1.2.1.tar.gz"
          })
          .run("cp -r /root/elasticsearch/elasticsearch-1.2.1 " + opts.installpath)
          .config(function(c) {
            return c.add({
              from: __dirname + "/runit/elasticsearch",
              to: "/etc/service/elasticsearch/run",
              transform: mustache(opts)
            })
            .add({
              from: __dirname + "/config/elasticsearch/elasticsearch.yml",
              to: "/opt/elasticsearch/config",
              transform: mustache(opts)
            })
          })
        }
