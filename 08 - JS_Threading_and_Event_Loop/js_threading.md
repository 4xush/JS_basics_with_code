# JavaScript Threading Model and Event Loop

## Single-Threaded Nature of JavaScript

JavaScript is fundamentally single-threaded, meaning it has:

- One Call Stack
- One Memory Heap
- Runs one piece of code at a time

### The Call Stack

```javascript
function first() {
  console.log("1: First");
  second();
}

function second() {
  console.log("2: Second");
  third();
}

function third() {
  console.log("3: Third");
}

first();
// Output:
// 1: First
// 2: Second
// 3: Third
```

## How JavaScript Achieves Concurrency

Despite being single-threaded, JavaScript can handle concurrent operations through:

1. Event Loop
2. Web APIs (in browsers) / C++ APIs (in Node.js)
3. Callback Queue
4. Microtask Queue

### The Event Loop Process

1. Execute code in Call Stack
2. Check Microtask Queue (Promise callbacks)
3. Check Macrotask Queue (setTimeout, setInterval, etc.)
4. Render UI (in browsers)
5. Repeat

## Common Interview Questions and Examples

### Q1: What is the output of this code and why?

```javascript
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");

// Output:
// 1
// 4
// 3
// 2
```

**Explanation:**

1. Synchronous code executes first ('1', '4')
2. Promise (microtask) executes next ('3')
3. setTimeout callback (macrotask) executes last ('2')

### Q2: How does JavaScript handle long-running tasks?

```javascript
// ❌ Bad - blocks the main thread
function heavyComputation() {
  for (let i = 0; i < 1000000000; i++) {
    // doing something heavy
  }
}

// ✅ Good - breaks task into chunks
function nonBlockingComputation(start = 0) {
  if (start >= 1000000000) return;

  // Process only 1000 items at a time
  for (let i = start; i < Math.min(start + 1000, 1000000000); i++) {
    // doing something heavy
  }

  setTimeout(() => {
    nonBlockingComputation(start + 1000);
  }, 0);
}
```

### Q3: What are Web Workers and when to use them?

```javascript
// main.js
const worker = new Worker("worker.js");

worker.postMessage({ data: "Start heavy computation" });

worker.onmessage = function (e) {
  console.log("Result from worker:", e.data);
};

// worker.js
self.onmessage = function (e) {
  // Perform heavy computation in separate thread
  const result = heavyComputation(e.data);
  self.postMessage(result);
};
```

## Advanced Concepts

### 1. Microtasks vs Macrotasks

```javascript
Promise.resolve().then(() => console.log("Microtask 1"));
setTimeout(() => console.log("Macrotask 1"), 0);
Promise.resolve().then(() => console.log("Microtask 2"));
setTimeout(() => console.log("Macrotask 2"), 0);

// Output:
// Microtask 1
// Microtask 2
// Macrotask 1
// Macrotask 2
```

### 2. Event Loop with Async/Await

```javascript
async function example() {
  console.log("1");
  await Promise.resolve();
  console.log("2");
  setTimeout(() => console.log("3"), 0);
  await Promise.resolve();
  console.log("4");
}

example();
console.log("5");

// Output:
// 1
// 5
// 2
// 4
// 3
```

## Common Pitfalls and Best Practices

### 1. Blocking the Main Thread

```javascript
// ❌ Bad
while (someCondition) {
  heavyComputation();
}

// ✅ Good
async function processInChunks(items) {
  const CHUNK_SIZE = 100;
  for (let i = 0; i < items.length; i += CHUNK_SIZE) {
    const chunk = items.slice(i, i + CHUNK_SIZE);
    await new Promise((resolve) => setTimeout(resolve, 0));
    processChunk(chunk);
  }
}
```

### 2. Memory Leaks in Callbacks

```javascript
// ❌ Bad - Potential memory leak
function addHandler() {
  let data = "Large data";
  element.addEventListener("click", function () {
    console.log(data);
  });
}

// ✅ Good - Clean up when done
function addHandler() {
  let data = "Large data";
  const handler = () => {
    console.log(data);
    element.removeEventListener("click", handler);
  };
  element.addEventListener("click", handler);
}
```

## Interview Tips

1. **Explain the Event Loop in simple terms:**

   - JavaScript has a single thread
   - Async operations are handled by Web APIs
   - Event Loop checks queues and pushes callbacks to the stack

2. **Common async patterns to know:**

   - Callbacks
   - Promises
   - Async/await
   - Web Workers
   - RequestAnimationFrame

3. **Performance considerations:**
   - Long tasks block the main thread
   - Use chunking for heavy computations
   - Leverage Web Workers for CPU-intensive tasks
   - Be mindful of memory leaks in callbacks
