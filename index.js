function runsLimitFunc ({maxRuns = 100} = {}) {
  let runCount = 0
  const queue = []

  function flush () {
    const countToRun = maxRuns - runCount
    if (countToRun > 0) {
      const resolves = queue.splice(0, countToRun)
      runCount += resolves.length
      resolves.forEach(resolve => resolve())
    }
  }

  return function wrapFunc (func) {
    return function wrappedFunc (...args) {
      return new Promise(resolve => {
        queue.push(resolve)
        flush()
      }).then(async () => {
        let result
        let error
        try {
          result = await func(...args)
        } catch (err) {
          error = err
        }
        runCount--
        flush()
        if (error) throw error
        else return result
      })
    }
  }
}

module.exports = runsLimitFunc