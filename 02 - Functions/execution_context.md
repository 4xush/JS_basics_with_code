# 🔹 What is Execution Context in JavaScript?

An **Execution Context (EC)** is the **environment** in which JavaScript code is evaluated and executed.

It contains information about:

* **Which variables and functions are available** (scope)
* **The value of `this`**
* **How the code should be executed**

👉 In simple words: An execution context is like a “box” that stores everything the JavaScript engine needs to run your code.

---

## 📌 Types of Execution Context

1. **Global Execution Context (GEC)**

   * Created when the JS program first runs.
   * `this` refers to **`window` (browser)** or **`global` (Node.js)**.
   * Only one GEC per program.
   * Holds global variables and functions.

```js
var x = 10;

function greet() {
  console.log("Hello");
}
```

Here, both `x` and `greet` live in the **Global Execution Context**.

---

2. **Function Execution Context (FEC)**

   * Created whenever a function is invoked.
   * Each function call creates a **new execution context**.
   * Keeps track of function’s local variables, arguments, and inner function definitions.

```js
function add(a, b) {
  var sum = a + b;
  return sum;
}

add(2, 3); // Creates a new Function Execution Context
```

## 📌 Phases of Execution Context

Each execution context is created in **two phases**:

### 1. **Creation Phase**

* Memory is allocated for variables and functions.
* Variables declared with `var` are **hoisted** and set to `undefined`.
* Functions are hoisted with their full definition.
* `this` is determined.

```js
console.log(a); // undefined (hoisted)
greet();        // "Hello"

var a = 10;
function greet() {
  console.log("Hello");
}
```

---

### 2. **Execution Phase**

* Code runs line by line.
* Values are assigned to variables.
* Functions are executed when called.

---

## 📌 Execution Context Stack (Call Stack)

* JavaScript uses a **stack** to manage execution contexts.
* The **Global Execution Context** is pushed first.
* Each function call pushes a **new Function Execution Context**.
* When a function finishes, its context is **popped off** the stack.

Example:

```js
function first() {
  second();
  console.log("First done");
}

function second() {
  console.log("Second done");
}

first();
```

🔹 Execution flow:

1. Global EC created
2. `first()` EC pushed
3. Inside `first()`, `second()` EC pushed
4. `second()` runs and is popped
5. `first()` finishes and is popped
6. Back to Global EC

---

## 🔗 Related Topics

* **Scope & Scope Chain** → managed inside EC
* **Hoisting** → happens during EC creation phase
* **Closures** → inner functions keep access to variables from ECs that have been destroyed
* **this keyword** → value of `this` is set in the creation phase of EC

---

✅ **Summary**

* Execution Context = **environment where code runs**
* Types → **Global, Function, Eval**
* Created in **two phases**: Creation (hoisting) + Execution (line by line)
* Managed with a **call stack**

---
