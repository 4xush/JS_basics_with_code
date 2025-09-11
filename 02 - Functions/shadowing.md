# 🔹 What is Shadowing in JavaScript?

Shadowing is when a variable in an inner scope **overrides** a variable with the same name in an outer scope **without affecting it** outside.

**Variable shadowing** occurs when a **variable in an inner scope has the same name as a variable in an outer scope**.

* The **inner variable “shadows” or overrides** the outer variable **within its own scope**.
* Outside the inner scope, the outer variable remains accessible.

---

## 📌 Example: Function Scope Shadowing

```js
let name = "Alice"; // global variable

function greet() {
  let name = "Bob"; // local variable shadows global
  console.log("Hello " + name); // Hello Bob
}

greet();
console.log(name); // Alice (global variable unaffected)
```

✅ Here:

* `name` inside `greet()` **shadows** the global `name`.
* The inner `name` is used **inside the function only**.

---

## 📌 Example: Block Scope Shadowing

```js
let x = 10;

if (true) {
  let x = 20; // block scoped variable shadows outer x
  console.log(x); // 20
}

console.log(x); // 10 (outer x remains)
```

> Note: Shadowing only occurs if the inner variable **has the same name**.

---

## 📌 Shadowing with Function Parameters

```js
let message = "Hello, world!";

function printMessage(message) { // parameter shadows outer message
  console.log(message);
}

printMessage("Hi!"); // Hi!
console.log(message); // Hello, world!
```

---

## 📌 Key Points

* Shadowing **does not delete or change** the outer variable.
* Inner scope **takes priority** when a variable with the same name exists.
* Happens in:

  * Function scope
  * Block scope (`let` / `const`)
  * Function parameters

---

## 🔗 Related Topics

* **Scope & Scope Chain** → shadowing happens due to nested scopes.
* **Closures** → inner functions can shadow outer variables.
* **Hoisting** → `var` can complicate shadowing due to function-level scope.

---


