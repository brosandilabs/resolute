# resolute
A resolute retry module for javascript

``` javascript
const test = async (message) => {
    await some_promise(message);
};

const retry_test = resolute.retry(test, { max_retries: 3 });

await retry_test('hello');
```
