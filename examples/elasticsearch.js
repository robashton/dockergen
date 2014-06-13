var dsl = require('../index')

module.exports = dsl()
                  .wget({
                    dir: "/root/elasticsearch",
                    from: "https://download.elasticsearch.org/elasticsearch/elasticsearch/elasticsearch-1.2.1.tar.gz"
                  })
                  .tar({
                    flags: "xzf",
                    file: "/root/elasticsearch/elasticsearch-1.2.1.tar.gz"
                  })
                  .run("cp -r /root/elasticsearch/elasticsearch-1.2.1 /opt/elasticsearch")
