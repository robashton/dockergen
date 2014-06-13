var dsl = require('../index')
  , mustache = require('../mustache')

  module.exports = function(opts) {
    return dsl()
    .wget({
        dir: "/root/riemann",
        from: "http://aphyr.com/riemann/riemann-0.2.5.tar.bz2" })
    .tar({
        flags: "xvfj",
        file: "/root/riemann/riemann-0.2.5.tar.bz2"})
      .config(function(c) {
        c.add({
          from: "config/riemann/riemann.config",
          to: "/root/riemann/riemann-0.2.5/etc/riemann.config",
          transform: mustache(opts) })
        .add({
          from: "/runit/riemann",
          to: "/etc/service/riemann/run" })
      })
