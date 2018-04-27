const buildSignal = require('runs-limit-signal')

function runsLimitFunc (options) {
  const signal = buildSignal(options)
  return function wrapFunc (func) {
    return async function wrappedFunc (...args) {
      const done = await signal()
      let result
      let error
      try {
        result = await func(...args)
      } catch (err) {
        error = err
      }
      done()
      if (error) throw error
      else return result
    }
  }
}

module.exports = runsLimitFunc