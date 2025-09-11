# Promises Examples and Doubt

## Basic Syntax

### Creating a Promise

A Promise is created using the `Promise` constructor, which takes an executor function with two parameters: `resolve` and `reject`.

```javascript
const myPromise = new Promise((resolve, reject) => {
  // Asynchronous operation
  setTimeout(() => {
    const success = true; // Simulate success or failure
    if (success) {
      resolve("Operation successful!");
    } else {
      reject("Operation failed!");
    }
  }, 1000);
});
```

### Using a Promise

Promises have three states:

- **Pending**: Initial state, neither fulfilled nor rejected.
- **Fulfilled**: The operation completed successfully.
- **Rejected**: The operation failed.

You can handle the result using `.then()` for success and `.catch()` for errors.

```javascript
myPromise
  .then((result) => {
    console.log(result); // "Operation successful!"
  })
  .catch((error) => {
    console.error(error); // "Operation failed!"
  });
```

### Chaining Promises

Promises can be chained to handle sequential asynchronous operations.

```javascript
myPromise
  .then((result) => {
    console.log(result);
    return anotherAsyncOperation();
  })
  .then((nextResult) => {
    console.log(nextResult);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Async/Await Syntax

With `async/await`, you can write asynchronous code that looks synchronous.

```javascript
async function handlePromise() {
  try {
    const result = await myPromise;
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

handlePromise();
```

## Problematic Function Example

Consider this function:

```javascript
function getData() {
  let data = "My Secret Data!";
  return new Promise();
}
```

### Issue

This function returns an empty `Promise` that never resolves or rejects. The `Promise` constructor **requires** an executor function as an argument, which provides the `resolve` and `reject` functions. Without it, the Promise remains in the **pending** state forever and cannot transition to fulfilled or rejected.

Creating a new `Promise` object must include at least the `resolve` function (and optionally `reject`) inside the executor to handle the asynchronous operation. Without calling `resolve()` or `reject()`, the Promise is useless and will hang indefinitely.

### Why It Fails

- The Promise constructor expects: `new Promise((resolve, reject) => { ... })`
- Here, no executor is provided: `new Promise()` (empty)
- Result: Promise stays pending, never fulfills or rejects
- Any code waiting for this Promise (e.g., `.then()` or `await`) will never execute

### Corrected Version

To fix it, provide an executor function and call `resolve()` with the data:

```javascript
function getData() {
  let data = "My Secret Data!";
  return new Promise((resolve, reject) => {
    // Simulate async operation
    setTimeout(() => {
      resolve(data); // Resolve with the data
    }, 1000);
  });
}

// Usage
getData()
  .then((data) => console.log("Received:", data)) // "Received: My Secret Data!"
  .catch((error) => console.error(error));
```

Now, the Promise will resolve after 1 second with the value "My Secret Data!".

## What `resolve` and `reject` Actually Do

In the Promise executor function, `resolve` and `reject` are functions provided by the Promise constructor to control the Promise's state.

### `resolve(value)`

- **What it does**: Changes the Promise's state from "pending" to "fulfilled" and passes the `value` to the next `.then()` handler.
- **When to use**: Call `resolve()` when the asynchronous operation succeeds.
- **Handling**: The value is received in `.then()`.

**Example:**

```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Success!"); // Fulfills the Promise
  }, 1000);
});

promise.then((result) => {
  console.log(result); // Output: "Success!"
});
```

**Equivalent Simple Code (using callbacks):**

```javascript
function asyncOperation(callback) {
  setTimeout(() => {
    callback(null, "Success!"); // null for no error
  }, 1000);
}

asyncOperation((error, result) => {
  if (!error) {
    console.log(result); // "Success!"
  }
});
```

### `reject(reason)`

- **What it does**: Changes the Promise's state from "pending" to "rejected" and passes the `reason` (usually an error) to the `.catch()` handler.
- **When to use**: Call `reject()` when the asynchronous operation fails.
- **Handling**: The reason is received in `.catch()`.

**Example:**

```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error("Something went wrong!")); // Rejects the Promise
  }, 1000);
});

promise.catch((error) => {
  console.error(error.message); // Output: "Something went wrong!"
});
```

**Equivalent Simple Code (using callbacks):**

```javascript
function asyncOperation(callback) {
  setTimeout(() => {
    callback(new Error("Something went wrong!"), null); // Error first
  }, 1000);
}

asyncOperation((error, result) => {
  if (error) {
    console.error(error.message); // "Something went wrong!"
  }
});
```

In summary:

- `resolve()` is like calling the success callback with the result.
- `reject()` is like calling the error callback with the error.
- Promises standardize this pattern, making error handling more consistent and chaining easier.
