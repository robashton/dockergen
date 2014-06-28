var dsl = require('../index')

module.exports = dsl("base setup")
  .from("phusion/passenger-customizable:0.9.10")
  .env("HOME", "/root")
  .run("apt-get update")
  .run("apt-get update --fix-missing -y")
  .install("wget")
  .install("openjdk-7-jre --no-install-recommends")
