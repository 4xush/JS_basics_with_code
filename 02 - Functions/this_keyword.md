# 🔹 What is `this` in JavaScript?

The **`this` keyword** in JavaScript refers to the **execution context** – i.e., the object that is "calling" or "owning" the function.

⚡ In simple words: "`this` is determined at runtime depending on how a function is invoked, not where it is defined."

---

## 📌 Rules of `this` (Execution Context)

### 1. **Global Context**

* In **browsers**, `this` refers to the `window` object.
* In **Node.js**, it refers to `global` (but in strict mode inside modules, `this` is `undefined`).

```js
console.log(this);  
// Browser → Window object
// Node.js → {} (module scope)
```

---

### 2. **Inside an Object (Method Invocation)**

When a function is called as a method of an object, `this` refers to that object.

```js
const user = {
  name: "Alice",
  greet: function() {
    console.log("Hello " + this.name);
  }
};

user.greet();  // Hello Alice
```

---

### 3. **Alone in a Function (Default Binding)**

If a function is called standalone:

* **Non-strict mode** → `this` = global object (`window` in browser).
* **Strict mode** → `this` = `undefined`.

```js
function show() {
  console.log(this);
}

show();  // Browser → Window, Node → global
```

---

### 4. **Constructor Functions / Classes (New Binding)**

When a function is called with `new`, `this` refers to the **newly created object**.

```js
function Person(name) {
  this.name = name;
}

const p1 = new Person("John");
console.log(p1.name); // John
```

---

### 5. **Explicit Binding (`call`, `apply`, `bind`)**

We can explicitly set `this` using function methods:

```js
function greet() {
  console.log("Hello " + this.name);
}

const user = { name: "Bob" };

greet.call(user);   // Hello Bob
```

---

### 6. **Arrow Functions (Lexical `this`)**

Arrow functions **do not have their own `this`**.
They inherit `this` from their **surrounding scope** (lexical scope).

```js
const obj = {
  name: "Charlie",
  arrow: () => {
    console.log(this.name);
  },
  normal: function() {
    console.log(this.name);
  }
};

obj.arrow();   // undefined (inherits global `this`)
obj.normal();  // Charlie
```

---

### 7. **Event Handlers**

* By default, `this` inside event handlers refers to the element that received the event.

```js
document.querySelector("button").addEventListener("click", function() {
  console.log(this); // The button element
});
```

---

## 🔗 Related Topics

* **Execution Context** → Determines how `this` is resolved.
* **Scope vs. this** → Scope is about variables; `this` is about object context.
* **call, apply, bind** → Tools to explicitly control `this`.
* **Arrow functions** → Special case where `this` is lexically bound.
* **Closures** → Sometimes used to “remember” `this` in older JS (`var self = this;`).

---

✅ **Summary:**

* `this` is **dynamic** → depends on how the function is called.
* 4 main bindings: **default, implicit, explicit, new**.
* Arrow functions don’t have their own `this`.

---

👉 Do you want me to also draft a **Markdown doc (`this.md`)** with diagrams/examples so it fits neatly in your `/functions/` folder?
