# 🔹 Callbacks vs Promises vs Async/Await in JavaScript

All three are **ways to handle asynchronous operations** in JavaScript, but they differ in readability, error handling, and control flow.

---

## 1. **Callbacks**

### ✅ What are Callbacks?

* A **function passed as an argument** to another function to run **after some task completes**.
* Oldest style for async code in JS.

### Example:

```js
function fetchData(callback) {
  setTimeout(() => {
    callback("Data received");
  }, 1000);
}

fetchData((data) => {
  console.log(data);
});
```

**Output (after 1s):**

```
Data received
```

### Pros:

* Simple for single async tasks.

### Cons:

* **Callback hell / Pyramid of Doom** with nested callbacks.
* Harder to read and maintain.
* Error handling is clunky (`try/catch` doesn’t work for async).

---

## 2. **Promises**

### ✅ What are Promises?

* Objects representing **future completion or failure** of an async task.
* Introduced to **avoid callback hell**.

### Example:

```js
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data received");
    }, 1000);
  });
}

fetchData()
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
```

**Output:**

```
Data received
```

### Pros:

* Better **readability** than callbacks.
* **Chaining** of multiple async tasks.
* Built-in **error handling** with `.catch()`.

### Cons:

* Still uses `.then()` chaining → can get long for multiple async steps.

---

## 3. **Async / Await**

### ✅ What is Async/Await?

* Modern syntax built on **Promises**.
* Makes async code **look synchronous**, easier to read.

### Example:

```js
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data received");
    }, 1000);
  });
}

async function getData() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

getData();
```

**Output:**

```
Data received
```

### Pros:

* Clean, readable code.
* Works nicely with **try/catch** for errors.
* Avoids **callback hell** entirely.

### Cons:

* Requires ES2017+
* Must be used inside an **async function**

---

## 4. **Comparison Table**

| Feature        | Callback             | Promise                | Async / Await     |
| -------------- | -------------------- | ---------------------- | ----------------- |
| Syntax         | Function passed      | `.then()` / `.catch()` | `async` / `await` |
| Readability    | Poor with nesting    | Better than callback   | Best              |
| Error Handling | Manual (`err` param) | `.catch()`             | `try/catch`       |
| Composition    | Hard                 | `.then()` chaining     | Easy with `await` |
| Modern JS      | Old                  | ES6                    | ES2017+           |

---

## 🔗 Related Concepts

* **Event loop** → determines when callbacks, promises, and async/await run.
* **Microtasks vs Macrotasks** → Promises/async await go into **microtask queue**, setTimeout into **macrotask queue**.
* **Blocking vs Non-blocking** → Async techniques make JS non-blocking.

---

✅ **Summary**

1. **Callback** → basic, can lead to nested code.
2. **Promise** → avoids callback hell, allows chaining and better error handling.
3. **Async/Await** → cleanest syntax, reads like synchronous code, built on Promises.

---