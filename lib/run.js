var BuildContext = require('./buildcontext')
  , spawn = require('child_process').spawn
  , config = require('./config')
  , argv = require('yargs')
            .usage("Usage: $0 compile | build | run")
            .demand(1)
            .argv

module.exports = function(step) {
  switch(argv._[0]) {
    case "compile":
      compile(step)
      break
    case "build":
      build(step)
      break
    case "run":
      run()

  }
}


function compile(step) {
  var ctx = new BuildContext()
  step.buildInto(ctx)
  ctx.dump()
}

function build(step) {
  var ctx = new BuildContext()
  step.buildInto(ctx)
  ctx.dump()

  var name = ctx.packageName()
  var docker = spawn("docker", ["build", "-t", name, config.output], {
      cwd: process.cwd(),
      env: process.env
  })
  docker.stdout.pipe(process.stdout)
  docker.stderr.pipe(process.stderr)
  docker.on('close', function (code) {
    console.log('Docker exited with code: ' + code)
  })
}

function run() {
  var ctx = new BuildContext()
  step.buildInto(ctx)

  var name = ctx.packageName()
  var docker = spawn("docker", ["run", "-i", "-t", name], {
    cwd: process.cwd(),
    env: process.env
  })
  docker.stdout.pipe(process.stdout)
  docker.stderr.pipe(process.stderr)
  docker.stdin.pipe(process.stdin)
  docker.on('close', function (code) {
    console.log('Docker exited with code: ' + code)
  })

}
