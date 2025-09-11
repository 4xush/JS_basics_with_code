# 🔹 Blocking vs Non-Blocking Operations in JavaScript

**Blocking** and **Non-Blocking** describe **how code execution handles tasks that take time**, like I/O operations (file reading, network requests, timers).

---

## 1. **Blocking (Synchronous)**

* A **blocking operation** **stops further execution** until it finishes.
* Other tasks **cannot run** while it’s executing.

### Example:

```js
const fs = require("fs");

console.log("Start reading file...");
const data = fs.readFileSync("file.txt", "utf8"); // Blocking
console.log(data);
console.log("Done");
```

**Output (example):**

```
Start reading file...
<contents of file.txt>
Done
```

✅ Explanation:

* `readFileSync` blocks the **entire thread** until the file is read.
* Nothing else can execute during this time.

---

## 2. **Non-Blocking (Asynchronous)**

* A **non-blocking operation** allows **other code to run while waiting** for the task to complete.
* Usually uses **callbacks, Promises, or async/await**.

### Example:

```js
const fs = require("fs");

console.log("Start reading file...");
fs.readFile("file.txt", "utf8", (err, data) => {  // Non-blocking
  if (err) throw err;
  console.log(data);
});
console.log("Done");
```

**Output:**

```
Start reading file...
Done
<contents of file.txt>
```

✅ Explanation:

* `readFile` is **asynchronous**.
* JS continues execution (`console.log("Done")`) while waiting for the file.
* Once ready, the callback runs.

---

## 3. **Key Differences**

| Feature        | Blocking / Synchronous         | Non-Blocking / Asynchronous        |
| -------------- | ------------------------------ | ---------------------------------- |
| Execution      | Stops all other tasks          | Allows other tasks to run          |
| Performance    | Can slow down program          | More efficient, concurrent         |
| Use Cases      | Quick tasks, small scripts     | I/O, network requests, timers      |
| Examples in JS | `readFileSync`, loops, alert() | `readFile`, `setTimeout`, Promises |

---

## 4. **Relation with Event Loop**

* **Blocking code** → freezes the **call stack**, delays microtasks/macrotasks.
* **Non-blocking code** → schedules tasks in **event loop** (microtask or macrotask), stack remains free.

```js
console.log("Start");

setTimeout(() => console.log("Timer"), 0);
console.log("End");

// Output:
// Start
// End
// Timer
```

---

✅ **Summary:**

* **Blocking = synchronous** → stops execution until task is done.
* **Non-blocking = asynchronous** → schedules task, allows JS to continue running.
* JS is **single-threaded**, so **non-blocking** is key for high performance.

---

If you want, I can make a **diagram + ready Markdown doc (`blocking-nonblocking.md`)** for your JS docs folder showing **call stack, event loop, blocking vs non-blocking** — it’s super helpful for interviews.

Do you want me to do that?
