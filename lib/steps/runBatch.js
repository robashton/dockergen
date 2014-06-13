module.exports = function(targets) {
  return this.run(["(", targets.join("; "), ")"].join(" "))
}
