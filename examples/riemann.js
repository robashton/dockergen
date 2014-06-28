var dsl = require('../index')
  , mustache = require('../mustache')

var version = "0.2.5",
    tar = ["riemann-", version, ".tar.bz2" ]

module.exports = function(opts) {
  return dsl("Riemann")
  .wget({
      dir: "/root/riemann",
      from: "http://aphyr.com/riemann/" + tar })
  .tar({
      flags: "xvfj",
      file: "/root/riemann/" + tar})
    .config(function(c) {
      return c.add({
          from: "config/riemann/riemann.config",
          to: "/root/riemann/riemann-" + version + "/etc/riemann.config",
          transform: mustache(opts) })
        .add({
          from: "/runit/riemann",
          to: "/etc/service/riemann/run" })
      })
    }
