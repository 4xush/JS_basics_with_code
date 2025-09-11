## 🔹 What is Hoisting?

Hoisting in JavaScript is a behavior where **variable and function declarations are moved to the top of their scope** (global or function scope) during the **compilation phase**, before the code is executed.

👉 Important: Only **declarations** are hoisted, not **initializations** (assignments).

---

## 🔹 Example 1: Function Hoisting

```javascript
sayHello(); // ✅ Works, even though defined later

function sayHello() {
  console.log("Hello World!");
}
```

✔ Functions declared with the `function` keyword are **hoisted with their definition**, so you can call them **before** they are written in the code.

---

## 🔹 Example 2: Variable Hoisting with `var`

```javascript
console.log(a); // ✅ undefined (not error)
var a = 10;
console.log(a); // 10
```

✔ `var` declarations are hoisted, but only the **declaration**, not the value.
So internally, JavaScript does this:

```javascript
var a;        // declaration hoisted
console.log(a); // undefined
a = 10;        // initialization stays in place
console.log(a); // 10
```

---

## 🔹 Example 3: `let` and `const` Hoisting

```javascript
console.log(b); // ❌ ReferenceError
let b = 20;

console.log(c); // ❌ ReferenceError
const c = 30;
```

✔ `let` and `const` are **also hoisted**, but they are in a **Temporal Dead Zone (TDZ)** from the start of their scope until their declaration line.
That’s why accessing them before initialization throws an **error**, not `undefined`.

---

## 🔹 Example 4: Function Expressions

```javascript
sayHi(); // ❌ TypeError: sayHi is not a function

var sayHi = function () {
  console.log("Hi!");
};
```

✔ Here `var sayHi` is hoisted (declared as `undefined`), but the **function value** is not assigned yet.
So calling it before assignment throws an error.

---

## 🔹 Quick Summary

1. **Function Declarations** → Hoisted completely (can be used before declaration).
2. **var Variables** → Hoisted but initialized with `undefined`.
3. **let & const Variables** → Hoisted but in Temporal Dead Zone (TDZ), so can’t access before initialization.
4. **Function Expressions / Arrow Functions** → Behave like variables (depends on var/let/const).


1️⃣ Variables
var hoisting

console.log(a); // undefined
var a = 10;
console.log(a); // 10

    What happens internally:

var a;           // declaration hoisted to top
console.log(a);  // undefined
a = 10;          // assignment stays here
console.log(a);  // 10

✅ Key points:

    var declaration is hoisted, but initialization is not.

    Before assignment, its value is undefined.

let and const hoisting

console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 20;

console.log(c); // ReferenceError
const c = 30;

    let and const are hoisted, but they are in a “temporal dead zone” until the line where they are defined.

    You cannot access them before initialization.

2️⃣ Functions
Function declarations

foo(); // Works! prints "Hello"

function foo() {
    console.log("Hello");
}

    Function declarations are fully hoisted — both name and body.

    You can call them before they appear in the code.

Function expressions

bar(); // TypeError: bar is not a function

var bar = function() {
    console.log("Hi");
};

    Only the variable bar is hoisted (as var bar; → undefined).

    The function assignment happens later.

    So calling it before assignment fails.

Arrow functions

baz(); // ReferenceError: Cannot access 'baz' before initialization
const baz = () => console.log("Arrow");

    Arrow functions behave like const or let — hoisted but in temporal dead zone.

3️⃣ Block-level hoisting (ES6)

if (true) {
    function foo() { console.log("Inside block"); }
}
foo(); // Works in non-strict Node.js, ReferenceError in strict mode/browser

    Behavior depends on environment:

        Browsers (strict ES6): block-level function → only exists inside block.

        Node.js: function may hoist to outer scope (global) → accessible outside.

✅ Key takeaway: don’t rely on function declarations inside blocks.
4️⃣ Order of hoisting

    Function declarations → hoisted first, fully (name + body).

    var declarations → hoisted, initialized as undefined.

    let / const declarations → hoisted, but in temporal dead zone.

    Function expressions / arrow functions → follow variable rules (var/let/const).

Example combining all

console.log(foo()); // Works: 10
console.log(a);     // undefined
// console.log(b);  // ReferenceError: cannot access 'b'
var a = 5;
let b = 20;

function foo() { return 10; }

var bar = function() { return 15; };
const baz = () => 30;

console.log(bar()); // 15
console.log(baz()); // 30

Visual timeline:
Step	What JS engine sees first (hoisting)
1	function foo() { return 10; } → fully hoisted
2	var a; → hoisted as undefined
3	var bar; → hoisted as undefined
4	let b; const baz; → hoisted, TDZ (cannot access)
Runtime	Assignments happen, function expressions are assigned