# resolute

## Description
A resolute retry module for javascript

## Usage
``` javascript
const resolute = require('brosandilabs/resolute');

const test = async (message) => {
    await some_promise(message);
};

const retry_test = resolute.retry(test, { max_retries: 3 });

await retry_test('hello');
```
