## 🔹 Definition

**Call binding** in JavaScript refers to explicitly setting the value of `this` inside a function using the **`.call()` method**.

By default, `this` depends on how a function is **invoked** (method, global, constructor, event, etc.).
With `.call()`, you can **manually bind** a specific object as the `this` context for that function.

---

## 🔹 Syntax

```js
functionName.call(thisArg, arg1, arg2, ...);
```

* **thisArg** → the object you want `this` to refer to.
* **arg1, arg2...** → arguments passed to the function.

---

## 🔹 Example

```js
function greet(greeting, punctuation) {
  console.log(greeting + " " + this.name + punctuation);
}

const user = { name: "Alice" };
const admin = { name: "Bob" };

// Using call() to bind `this`
greet.call(user, "Hello", "!");  // Output: Hello Alice!
greet.call(admin, "Hi", "!!");   // Output: Hi Bob!!
```

👉 Here, `greet` is a standalone function, but with `.call()` we **bind** `this` to different objects.

---

## 🔹 Real-world Use Case

### 1. **Borrowing methods**

If one object doesn’t have a method, you can borrow it from another object using `.call()`:

```js
const person = {
  fullName: function(city, country) {
    return this.firstName + " " + this.lastName + " from " + city + ", " + country;
  }
};

const user = {
  firstName: "John",
  lastName: "Doe"
};

// Borrow method using call
console.log(person.fullName.call(user, "Delhi", "India"));
// Output: John Doe from Delhi, India
```

---

### 2. **Reusing generic functions**

Instead of duplicating code, `.call()` lets you apply one function to different contexts.

```js
function calculateSalary(base, bonus) {
  return this.baseSalary + base + bonus;
}

const dev = { baseSalary: 50000 };
const manager = { baseSalary: 80000 };

console.log(calculateSalary.call(dev, 1000, 2000));     // 53000
console.log(calculateSalary.call(manager, 2000, 3000)); // 85000
```

---

✅ **Summary**:

* `.call()` is used to **explicitly bind `this`** to a specific object.
* It’s useful for **method borrowing**, **function reusability**, and **avoiding duplicate code**.
* Similar methods are `.apply()` (arguments as array) and `.bind()` (permanent binding).

---

Do you also want me to compare **`.call()`, `.apply()`, and `.bind()`** with examples so you can explain them in an interview?
