# 🔹 Microtasks and Macrotasks in JavaScript

JavaScript is **single-threaded**, but it can handle asynchronous tasks using the **event loop**.
Tasks in JS are divided into **Macrotasks** and **Microtasks**.

---

## 📌 1. Macrotask (Task)

**Macrotasks** include:

* `setTimeout` / `setInterval`
* `setImmediate` (Node.js)
* I/O operations (like fetching files, network requests)
* `requestAnimationFrame`

**Behavior:**

* Executed **after the current stack is empty**.
* Placed in the **task queue** (or macrotask queue).
* One macrotask runs at a time.

```js
console.log("Start");

setTimeout(() => {
  console.log("Macrotask: setTimeout");
}, 0);

console.log("End");

// Output:
// Start
// End
// Macrotask: setTimeout
```

---

## 📌 2. Microtask (Job)

**Microtasks** include:

* Promises (`.then`, `.catch`, `.finally`)
* `queueMicrotask()`
* MutationObserver

**Behavior:**

* Executed **immediately after the current execution stack**, **before any macrotask**.
* Placed in the **microtask queue**.

```js
console.log("Start");

Promise.resolve().then(() => {
  console.log("Microtask: Promise");
});

console.log("End");

// Output:
// Start
// End
// Microtask: Promise
```

---

## 📌 3. Microtask vs Macrotask

| Feature          | Microtask                                  | Macrotask                        |
| ---------------- | ------------------------------------------ | -------------------------------- |
| Queue            | Microtask queue                            | Task (macrotask) queue           |
| Examples         | Promises, `queueMicrotask`                 | `setTimeout`, I/O, `setInterval` |
| Execution Timing | After current stack, before next macrotask | After current stack + microtasks |
| Priority         | Higher                                     | Lower                            |

---

## 📌 4. Example: Combined Behavior

```js
console.log("Script start");

setTimeout(() => {
  console.log("Macrotask: setTimeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Microtask: Promise 1");
}).then(() => {
  console.log("Microtask: Promise 2");
});

console.log("Script end");

// Output:
// Script start
// Script end
// Microtask: Promise 1
// Microtask: Promise 2
// Macrotask: setTimeout
```


Yes ✅, **Promises** and **`setInterval` (or `setTimeout`)** are both asynchronous in JavaScript, but they behave very differently. Let’s break it down clearly:

---

## 1. **Nature**

| Feature      | Promise                                                        | setInterval / setTimeout                                       |
| ------------ | -------------------------------------------------------------- | -------------------------------------------------------------- |
| Type         | **Microtask** (higher priority)                                | **Macrotask** (lower priority)                                 |
| Purpose      | Represents **future completion/failure** of an async operation | Executes a function **after a delay** or repeatedly            |
| Execution    | Runs **once** when resolved/rejected                           | Runs **once (`setTimeout`)** or **repeatedly (`setInterval`)** |
| Return Value | A **Promise object**                                           | **Timer ID** (number in browser, object in Node.js)            |
| Chaining     | Can chain `.then()` / `.catch()`                               | Cannot chain like a Promise; needs callback                    |

---

## 2. **Example: Promise**

```js
console.log("Start");

Promise.resolve("Done").then((res) => {
  console.log("Promise:", res);
});

console.log("End");

// Output:
// Start
// End
// Promise: Done
```

* Runs **as a microtask** after the current stack finishes.
* Executes **once**, when resolved.

---

## 3. **Example: setInterval / setTimeout**

```js
console.log("Start");

setTimeout(() => {
  console.log("setTimeout executed");
}, 0);

setInterval(() => {
  console.log("setInterval executed");
}, 1000);

console.log("End");

// Output:
// Start
// End
// setTimeout executed
// setInterval executed (every 1 second)
```

* Runs as a **macrotask**.
* `setTimeout` → runs **once after delay**.
* `setInterval` → runs **repeatedly** until cleared.

---

## 4. **Key Differences**

1. **Queue / Priority**

   * Promise → Microtask queue (runs before next macrotask).
   * setInterval/setTimeout → Macrotask queue (runs after stack + microtasks).

2. **Repeatability**

   * Promise → runs **once**.
   * setInterval → runs **multiple times**, setTimeout → **once**.

3. **Chaining & Composability**

   * Promise → can chain `.then()` / `.catch()` / `async-await`.
   * setTimeout/setInterval → just callbacks; no native chaining.

4. **Error Handling**

   * Promise → `.catch()` / `try-catch` in async functions.
   * setTimeout/setInterval → errors go **uncaught** unless handled in callback.

---

### ✅ Summary

* **Promise** → used for handling async results, microtask, runs once, chainable.
* **setInterval/setTimeout** → used for scheduling, macrotask, can repeat, not chainable.

---


**Explanation:**

1. JS executes **synchronous code** first (`Script start`, `Script end`).
2. Then runs **microtasks** (Promises).
3. Finally executes **macrotasks** (`setTimeout`).

---

✅ **Summary:**

* **Macrotask** = normal tasks like timers, I/O.
* **Microtask** = higher priority tasks like Promises.
* Microtasks **always run before the next macrotask**.

---