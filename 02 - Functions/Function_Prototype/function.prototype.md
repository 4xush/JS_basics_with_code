## **1️⃣ What is `Function.prototype`?**

In JavaScript, **every function is an object**. That means it inherits properties and methods from **`Function.prototype`**.

* `Function.prototype` is a **built-in object** that contains **methods all functions can use**.
* Examples of such methods: `.call()`, `.apply()`, `.bind()`, `.toString()`, etc.

Think of it like a **template for all functions**.

---

## **2️⃣ How it works**

```js
function sayHi() {
  console.log("Hi!");
}

// sayHi is a function, so it inherits from Function.prototype
console.log(sayHi.__proto__ === Function.prototype); // true
```

* Here, `__proto__` points to `Function.prototype`.
* That’s why you can do:

```js
sayHi.call(null);   // Hi!
sayHi.apply(null);  // Hi!
const bound = sayHi.bind(null);
bound();            // Hi!
```

All of these methods come from **`Function.prototype`**.

---

## **3️⃣ Function prototype chain**

Every function has this chain:

```
sayHi --> Function.prototype --> Object.prototype --> null
```

* `Function.prototype` has the function-specific methods.
* `Object.prototype` has generic object methods like `.toString()`, `.hasOwnProperty()`.

---

## **4️⃣ Simple illustration**

```js
function greet(name) {
  console.log("Hello " + name);
}

console.log(greet.toString());   // [native code from Object.prototype]
console.log(greet.call({x:1}, "Alice")); // Hello Alice
console.log(greet.apply({x:1}, ["Bob"])); // Hello Bob
```

* `.toString()` → from `Object.prototype`
* `.call()` / `.apply()` → from `Function.prototype`

---

✅ **Key takeaway**:

**All functions in JS automatically inherit `Function.prototype`, which is why `.call()`, `.apply()`, and `.bind()` exist on every function.**

---