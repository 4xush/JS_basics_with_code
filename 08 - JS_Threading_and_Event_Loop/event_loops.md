# 🔹 Event Loop in JavaScript

**Definition:**
The **Event Loop** is a mechanism in JavaScript that **handles asynchronous operations** while JavaScript remains **single-threaded**.
It ensures that **non-blocking code** (like Promises, timers, I/O) executes **after the current execution stack is empty**.

---

## 📌 How It Works

1. **Call Stack** → Where the current function executes.
2. **Web APIs / Node APIs** → Browser or Node provides APIs for async tasks (setTimeout, fetch, etc.).
3. **Task Queues**

   * **Macrotask queue** → setTimeout, setInterval, I/O tasks.
   * **Microtask queue** → Promises, queueMicrotask, MutationObserver.
4. **Event Loop** → Checks if the call stack is empty.

   * If empty, executes **all microtasks first**, then executes **the first macrotask**.
   * Repeats continuously.

---

## 📌 Example: Microtasks vs Macrotasks

```js
console.log("Script start");

setTimeout(() => console.log("Macrotask: setTimeout"), 0);

Promise.resolve().then(() => console.log("Microtask: Promise"));

console.log("Script end");
```

**Output:**

```
Script start
Script end
Microtask: Promise
Macrotask: setTimeout
```

**Explanation:**

1. Synchronous code runs first → `Script start`, `Script end`.
2. Microtasks run next → Promise callback.
3. Macrotasks run last → setTimeout callback.

---

## 📌 Example: Multiple Promises and setTimeout

```js
console.log("Start");

setTimeout(() => console.log("setTimeout 1"), 0);

Promise.resolve().then(() => console.log("Promise 1"))
               .then(() => console.log("Promise 2"));

setTimeout(() => console.log("setTimeout 2"), 0);

console.log("End");
```

**Output:**

```
Start
End
Promise 1
Promise 2
setTimeout 1
setTimeout 2
```

✅ Shows that **microtasks always run before macrotasks**, even if setTimeout has `0ms` delay.

---

## 📌 Related Concepts

* **Call Stack** → synchronous code executes here.
* **Microtasks vs Macrotasks** → determines execution order.
* **Blocking vs Non-blocking** → Event loop enables non-blocking behavior.
* **Promises / Async-Await** → use microtasks.
* **setTimeout / setInterval** → use macrotasks.

---

## ✅ Summary

* JavaScript is **single-threaded** but **non-blocking**.
* **Event Loop** coordinates execution of synchronous and asynchronous code.
* **Microtasks** have **higher priority** than **macrotasks**.
* Essential for understanding **async JS, Promises, async/await, timers, Node.js I/O**.

---

