# JavaScript Key Concepts for Frontend Interviews

## Closure

**Definition**: A closure is a function that has access to variables from its outer (enclosing) function's scope, even after the outer function has returned.

**Example**:

```javascript
function createCounter() {
  let count = 0;
  return function () {
    return ++count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

## Lexical Scope

**Definition**: Lexical scope means that a variable defined outside a function can be accessed inside another function defined after the variable declaration.

**Example**:

```javascript
const name = "John";

function greet() {
  console.log(`Hello, ${name}`); // Accesses 'name' from outer scope
}

greet(); // "Hello, John"
```

## Event Delegation

**Definition**: Event delegation is a technique where you attach an event listener to a parent element to handle events that occur on its children.

**Example**:

```javascript
document.getElementById("menu").addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    console.log("Clicked on menu item:", e.target.textContent);
  }
});
```

## Event Bubbling

**Definition**: Event bubbling is the process where an event triggers on the deepest target element, then bubbles up through its ancestors in the DOM tree.

**Example**:

```javascript
// Events trigger in this order: button → div → body
document.querySelector("button").addEventListener("click", () => {
  console.log("Button clicked");
});
```

## Event Capturing

**Definition**: The opposite of bubbling, where events are first captured by the outermost element and then propagated to the inner elements.

**Example**:

```javascript
document.querySelector("div").addEventListener(
  "click",
  () => {
    console.log("Capturing phase");
  },
  true
); // true enables capturing
```

## Element.closest()

**Definition**: The `closest()` method traverses up the DOM tree and returns the first ancestor that matches a selector.

**Example**:

```javascript
// Find closest 'article' element from a button
const article = event.target.closest("article");
```

## Call/Apply/Bind

**Definition**: Methods to control what `this` refers to in a function.

**Example**:

```javascript
function greet(message) {
  console.log(`${message}, ${this.name}`);
}

const user = { name: "Alice" };

// Call - immediately invokes with specified this and comma-separated args
greet.call(user, "Hello"); // "Hello, Alice"

// Apply - same as call but takes args as array
greet.apply(user, ["Hi"]); // "Hi, Alice"

// Bind - returns a new function with this bound
const boundGreet = greet.bind(user);
boundGreet("Welcome"); // "Welcome, Alice"
```

## Promises

**Definition**: A Promise represents a value that may not be available yet but will be resolved at some point in the future.

**Example**:

```javascript
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("Data received"), 1000);
  });
}

fetchData()
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
```

## Hoisting

**Definition**: JavaScript behavior where variables and function declarations are moved to the top of their scope before code execution.

**Example**:

```javascript
console.log(hoistedFunction()); // "I'm hoisted!"
console.log(x); // undefined (declared but not initialized)
// console.log(y); // ReferenceError (let/const aren't hoisted the same way)

function hoistedFunction() {
  return "I'm hoisted!";
}

var x = 5;
let y = 10;
```

## Callbacks

**Definition**: Functions passed as arguments to other functions, which will be invoked later, often after an asynchronous operation.

**Example**:

```javascript
function fetchData(callback) {
  setTimeout(() => {
    callback("Data loaded");
  }, 1000);
}

fetchData(function (data) {
  console.log(data); // After 1 second: "Data loaded"
});
```

## Event Loop

**Definition**: JavaScript's mechanism for handling asynchronous operations through a queue system that processes events in order.

**Example**:

```javascript
console.log("Start");
setTimeout(() => console.log("Timeout"), 0);
Promise.resolve().then(() => console.log("Promise"));
console.log("End");

// Output: "Start", "End", "Promise", "Timeout"
```

## Execution Context

**Definition**: Environment where JavaScript code is executed, includes the value of `this`, variables, objects, and functions accessible from that code.

**Example**:

```javascript
// Global execution context
const globalVar = "I am global";

function outerFunc() {
  // New execution context created
  const outerVar = "I am from outer";

  function innerFunc() {
    // Another execution context
    console.log(globalVar, outerVar);
  }

  innerFunc();
}
```

## 'this' Keyword

**Definition**: Reference to the current execution context, whose value depends on how a function is called.

**Example**:

```javascript
// In a method
const user = {
  name: "Alice",
  greet() {
    console.log(`Hello, ${this.name}`);
  },
};
user.greet(); // "Hello, Alice"

// In a simple function
function standalone() {
  console.log(this); // Window (browser) or global (Node)
}

// In an arrow function
const user2 = {
  name: "Bob",
  greet: () => {
    console.log(`Hello, ${this.name}`); // this is from outer scope
  },
};
```

## Async/Await

**Definition**: Syntax for handling Promises that makes asynchronous code look and behave like synchronous code.

**Example**:

```javascript
async function fetchUser() {
  try {
    const response = await fetch("/api/user");
    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
  }
}
```

## Throttling

**Definition**: Technique to limit the number of times a function can be called in a given time period.

**Example**:

```javascript
function throttle(func, limit) {
  let inThrottle = false;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

const throttledScroll = throttle(() => console.log("Scrolled"), 1000);
window.addEventListener("scroll", throttledScroll);
```

## Debouncing

**Definition**: Technique that ensures a function isn't executed until after a certain amount of time has passed since it was last invoked.

**Example**:

```javascript
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

const debouncedSearch = debounce((query) => {
  console.log(`Searching for: ${query}`);
}, 500);

// Call debouncedSearch only after 500ms of inactivity
```

## Prototypal Inheritance

**Definition**: JavaScript objects can inherit properties and methods from other objects via the prototype chain.

**Example**:

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  return `Hello, I'm ${this.name}`;
};

const john = new Person("John");
console.log(john.greet()); // "Hello, I'm John"
```

## DOM Manipulation

**Definition**: Process of changing the Document Object Model structure, content, or style programmatically.

**Example**:

```javascript
// Create
const newElement = document.createElement("div");
newElement.textContent = "New content";

// Add
document.body.appendChild(newElement);

// Remove
document.body.removeChild(newElement);

// Update
document.getElementById("myElement").textContent = "Updated content";
```

## Web Storage (localStorage/sessionStorage)

**Definition**: Browser APIs for storing key-value pairs client-side, with localStorage persisting across sessions and sessionStorage limited to the current session.

**Example**:

```javascript
// Store data
localStorage.setItem("username", "john_doe");

// Retrieve data
const username = localStorage.getItem("username");

// Remove data
localStorage.removeItem("username");

// Clear all
localStorage.clear();
```
