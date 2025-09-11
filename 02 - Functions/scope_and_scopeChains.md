# 🔹 Scope in JavaScript

**Scope** defines **where variables, functions, and objects are accessible** in your code.

It’s like a **container that determines visibility**.

### 📌 Types of Scope

1. **Global Scope**

   * Variables declared **outside any function/block**.
   * Accessible anywhere in the program.

```js
let a = 10; // global
function test() {
  console.log(a); // ✅ accessible
}
test();
console.log(a);   // ✅ accessible
```

2. **Function Scope (Local Scope)**

   * Variables declared **inside a function**.
   * Only accessible **inside that function**.

```js
function test() {
  let b = 20; // local
  console.log(b); // ✅ accessible
}
console.log(b); // ❌ Error
```

3. **Block Scope**

   * Variables declared with `let` or `const` inside `{}` are **only accessible inside that block**.
   * `var` does **not** have block scope.

```js
if (true) {
  let c = 30;
  console.log(c); // ✅ accessible
}
console.log(c); // ❌ Error
```

4. **Lexical Scope**

   * Inner functions can access variables from **outer functions**.
   * Determined at **write time** (lexical), not runtime.

```js
function outer() {
  let outerVar = "Outer";
  function inner() {
    console.log(outerVar); // ✅ accessible
  }
  inner();
}
outer();
```

---

# 🔹 Scope Chain

The **Scope Chain** is the **mechanism JavaScript uses to look up variables**.

* When JS encounters a variable, it first looks in the **current scope**.
* If not found, it moves **outward** to the parent scope.
* Continues until **global scope**.

```js
let a = 10;

function outer() {
  let b = 20;
  function inner() {
    let c = 30;
    console.log(a, b, c); // 10 20 30
  }
  inner();
}

outer();
```

✅ Here:

* `c` → found in inner scope
* `b` → not in inner, found in outer scope
* `a` → not in inner or outer, found in global scope

---

## 🔗 Related Concepts

* **Closures** → inner function retains access to variables of outer scopes.
* **Hoisting** → affects how variables/functions are available in scopes.
* **Shadowing** → inner variables can override outer variables without affecting them.
* **Execution Context** → scope is created when execution context is created.

---

✅ **Summary**

| Concept       | Description                                    |
| ------------- | ---------------------------------------------- |
| Scope         | Where a variable is accessible.                |
| Scope Chain   | Lookup path JS uses to find a variable.        |
| Lexical Scope | Inner functions can use outer variables.       |
| Shadowing     | Inner variable overrides outer with same name. |

---
