# Callback Doubt: Why is this function returning undefined?

## Problematic Code

```javascript
function getData() {
  setTimeout(() => {
    return "Async Data";
  }, 1000);
}

async function main() {
  const res = await getData();
  console.log(res);
}

main();
```

## Explanation

- The `getData` function does not return anything. It only schedules a `setTimeout` callback to run after 1 second.
- The `setTimeout` callback's `return` statement does **not** return a value from `getData`. It only returns from the callback function passed to `setTimeout`.
- As a result, `getData()` returns `undefined` immediately, before the timeout fires.
- When you use `await getData()`, you are effectively doing `await undefined`, so `res` is `undefined`.

## Correct Approach

To make `getData` work asynchronously with `await`, it should return a Promise and resolve it inside the `setTimeout`:

```javascript
function getData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Async Data");
    }, 1000);
  });
}

async function main() {
  const res = await getData();
  console.log(res); // Output: Async Data
}

main();
```

Now, `getData` returns a Promise that resolves after 1 second, and `await getData()` waits for the value.
