const sleep = require('sleep-promise')
const runsLimitFunc = require('./index')

describe('runsLimitFunc', function () {
  it('should run functions with concurrent limit', async () => {
    const started = []
    const finished = []

    async function func (arg) {
      started.push(arg)
      await sleep(100)
      finished.push(arg)
    }

    const limitedFunc = runsLimitFunc({maxRuns: 2})(func)

    limitedFunc(1)
    limitedFunc(2)
    limitedFunc(3)

    await sleep()
    expect(started).toEqual([1, 2])
    await sleep(100)
    expect(finished).toEqual([1, 2])
    await sleep()
    expect(started).toEqual([1, 2, 3])
    await sleep(100)
    expect(finished).toEqual([1, 2, 3])
    await sleep()
    expect(started).toEqual([1, 2, 3])
    limitedFunc(4)
    await sleep()
    expect(started).toEqual([1, 2, 3, 4])
    await sleep(100)
    expect(finished).toEqual([1, 2, 3, 4])
  })
})