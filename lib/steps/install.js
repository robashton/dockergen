module.exports = function(package) {
  return this.run("apt-get install -y " + package)
}
