var dsl = require('../index')

module.exports = dsl()
  .wget({ dir: "/root/riemann",
          from: "http://aphyr.com/riemann/riemann-0.2.5.tar.bz2" })
  .tar({ flags: "xvfj", file: "/root/riemann/riemann-0.2.5.tar.bz2"})
  .add({ source: __dirname + "runit/riemann",  destination: "/etc/service/riemann/run"})
