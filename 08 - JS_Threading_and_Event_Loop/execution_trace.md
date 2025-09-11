# JavaScript Threading Examples - Execution Trace

This document shows the state of the **Call Stack**, **Microtask Queue**, and **Macrotask Queue** at each step of code execution.

## Legend
- **Call Stack**: Functions currently being executed (LIFO - Last In, First Out)
- **Microtask Queue**: Promise callbacks, queueMicrotask() (Higher priority than macrotasks)
- **Macrotask Queue**: setTimeout, setInterval, I/O operations (Lower priority)
- **Output**: What gets logged to console

---

## Example 1: Call Stack Demonstration

```javascript
function first() {
  console.log('1: First');
  second();
}
function second() {
  console.log('2: Second');
  third();
}
function third() {
  console.log('3: Third');
}
first();
```

### Execution Steps:

| Step | Code Line | Call Stack | Microtask Queue | Macrotask Queue | Output |
|------|-----------|------------|-----------------|-----------------|--------|
| 1 | `first()` called | `[main, first]` | `[]` | `[]` | |
| 2 | `console.log('1: First')` | `[main, first]` | `[]` | `[]` | "1: First" |
| 3 | `second()` called | `[main, first, second]` | `[]` | `[]` | |
| 4 | `console.log('2: Second')` | `[main, first, second]` | `[]` | `[]` | "2: Second" |
| 5 | `third()` called | `[main, first, second, third]` | `[]` | `[]` | |
| 6 | `console.log('3: Third')` | `[main, first, second, third]` | `[]` | `[]` | "3: Third" |
| 7 | `third()` returns | `[main, first, second]` | `[]` | `[]` | |
| 8 | `second()` returns | `[main, first]` | `[]` | `[]` | |
| 9 | `first()` returns | `[main]` | `[]` | `[]` | |
| 10 | Script complete | `[]` | `[]` | `[]` | |

**Final Output Order**: "1: First", "2: Second", "3: Third"

---

## Example 2: Event Loop and Queues

```javascript
console.log('1' + " main stack - starts");
setTimeout(() => console.log('2' + " macrotask queue from global execution"), 0);
Promise.resolve().then(() => console.log('3' + " microtask queue from global execution"));
console.log('4' + " main stack - again");
```

### Execution Steps:

| Step | Code Line | Call Stack | Microtask Queue | Macrotask Queue | Output |
|------|-----------|------------|-----------------|-----------------|--------|
| 1 | `console.log('1'...)` | `[main]` | `[]` | `[]` | "1 main stack - starts" |
| 2 | `setTimeout(...)` | `[main]` | `[]` | `[callback1]` | |
| 3 | `Promise.resolve().then(...)` | `[main]` | `[callback2]` | `[callback1]` | |
| 4 | `console.log('4'...)` | `[main]` | `[callback2]` | `[callback1]` | "4 main stack - again" |
| 5 | Main script done | `[]` | `[callback2]` | `[callback1]` | |
| 6 | **Microtask executed** | `[callback2]` | `[]` | `[callback1]` | "3 microtask queue from global execution" |
| 7 | Microtask complete | `[]` | `[]` | `[callback1]` | |
| 8 | **Macrotask executed** | `[callback1]` | `[]` | `[]` | "2 macrotask queue from global execution" |
| 9 | All tasks complete | `[]` | `[]` | `[]` | |

**Final Output Order**: 
1. "1 main stack - starts"
2. "4 main stack - again"  
3. "3 microtask queue from global execution"
4. "2 macrotask queue from global execution"

---

## Example 3: Non-blocking Computation

```javascript
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

### Execution Pattern (First Few Iterations):

| Step | Code Line | Call Stack | Microtask Queue | Macrotask Queue | Notes |
|------|-----------|------------|-----------------|-----------------|-------|
| 1 | `nonBlockingComputation(0)` | `[main, nonBlockingComputation]` | `[]` | `[]` | start=0 |
| 2 | `for` loop (0-999) | `[main, nonBlockingComputation]` | `[]` | `[]` | Processing 1000 items |
| 3 | `setTimeout(...)` | `[main, nonBlockingComputation]` | `[]` | `[callback1]` | Schedule next batch |
| 4 | Function returns | `[main]` | `[]` | `[callback1]` | |
| 5 | Main script done | `[]` | `[]` | `[callback1]` | |
| 6 | **Macrotask 1 executed** | `[callback1, nonBlockingComputation]` | `[]` | `[]` | start=1000 |
| 7 | `for` loop (1000-1999) | `[callback1, nonBlockingComputation]` | `[]` | `[]` | Processing next 1000 |
| 8 | `setTimeout(...)` | `[callback1, nonBlockingComputation]` | `[]` | `[callback2]` | Schedule next batch |
| 9 | Function returns | `[callback1]` | `[]` | `[callback2]` | |
| 10 | Callback complete | `[]` | `[]` | `[callback2]` | |

**Pattern**: This continues with each iteration processing 1000 items, then scheduling the next batch as a macrotask, allowing the event loop to handle other tasks between iterations.

---

## Example 4: Async/Await and Event Loop

```javascript
async function example() {
  console.log('1' + " main stack - from async function");
  await Promise.resolve();
  console.log('2' +" microtask queue : 1 - from async function");
  setTimeout(() => console.log('3' + " macrotask queue from async function"), 0);
  await Promise.resolve();
  console.log('4' + " microtask queue : 2 - from async function");
}
example();
console.log('5' +" main stack - after calling async function");
```

### Execution Steps:

| Step | Code Line | Call Stack | Microtask Queue | Macrotask Queue | Output |
|------|-----------|------------|-----------------|-----------------|--------|
| 1 | `example()` called | `[main, example]` | `[]` | `[]` | |
| 2 | `console.log('1'...)` | `[main, example]` | `[]` | `[]` | "1 main stack - from async function" |
| 3 | `await Promise.resolve()` | `[main, example]` | `[resume1]` | `[]` | Function paused |
| 4 | Function suspended | `[main]` | `[resume1]` | `[]` | |
| 5 | `console.log('5'...)` | `[main]` | `[resume1]` | `[]` | "5 main stack - after calling async function" |
| 6 | Main script done | `[]` | `[resume1]` | `[]` | |
| 7 | **Microtask 1 executed** | `[resume1]` | `[]` | `[]` | Resume after first await |
| 8 | `console.log('2'...)` | `[resume1]` | `[]` | `[]` | "2 microtask queue : 1 - from async function" |
| 9 | `setTimeout(...)` | `[resume1]` | `[]` | `[callback1]` | |
| 10 | `await Promise.resolve()` | `[resume1]` | `[resume2]` | `[callback1]` | Function paused again |
| 11 | First resume done | `[]` | `[resume2]` | `[callback1]` | |
| 12 | **Microtask 2 executed** | `[resume2]` | `[]` | `[callback1]` | Resume after second await |
| 13 | `console.log('4'...)` | `[resume2]` | `[]` | `[callback1]` | "4 microtask queue : 2 - from async function" |
| 14 | Async function done | `[]` | `[]` | `[callback1]` | |
| 15 | **Macrotask executed** | `[callback1]` | `[]` | `[]` | "3 macrotask queue from async function" |
| 16 | All tasks complete | `[]` | `[]` | `[]` | |

**Final Output Order**:
1. "1 main stack - from async function"
2. "5 main stack - after calling async function"  
3. "2 microtask queue : 1 - from async function"
4. "4 microtask queue : 2 - from async function"
5. "3 macrotask queue from async function"

---

## Key Takeaways

1. **Call Stack**: Executes synchronously, must be empty before event loop processes queues
2. **Microtask Priority**: Microtasks always execute before macrotasks
3. **Async/Await**: Creates microtasks for resuming execution after each `await`
4. **Event Loop Order**: 
   - Execute all synchronous code (call stack)
   - Process all microtasks
   - Process one macrotask
   - Repeat

This execution model ensures non-blocking behavior while maintaining predictable execution order.