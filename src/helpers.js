const path = require('path')

function resolve(...args) {
  return path.resolve(process.cwd(), ...args)
}

module.exports = {
  resolve,
}
