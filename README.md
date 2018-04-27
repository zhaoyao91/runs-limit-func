# Runs Limit Func

wrap a function to support concurrency limit

## Installation

```
npm install runs-limti-func
```

## Usage

```
const runsLimitFunc = require('runs-limit-func')

async function func(arg1, arg2, ...) {
  ...
}

const limitedFunc = runsLimitFunc({
  maxRuns: 100 // Number, default to 100
})(func)

limitedFunc()
limitedFunc()
...
```

## License

MIT