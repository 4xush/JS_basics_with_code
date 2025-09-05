
## Closures

- A closure is a function that remembers variables from its outer (enclosing) scope, even after that outer function has finished running.
- This allows the inner function to use those variables later.

Example:

```js
function greet(name) {
  return function () {
    console.log("Hello, " + name + "!");
  };
}

const sayHelloToAyush = greet("Ayush");
sayHelloToAyush(); // Output: Hello, Ayush!
```

Here, greet returns a function that "remembers" the name you gave it. Whenever sayHelloToAyush is called, it prints "Hello, Ayush!"—even though greet has already finished running. This is the power of closures in JavaScript.


Another example:

```js
function outerFunction(outerVar) {
  return function innerFunction(innerVar) {
    console.log("Outer variable:", outerVar);
    console.log("Inner variable:", innerVar);
  };
}

const myClosure = outerFunction("I am from outer");
myClosure("I am from inner");
// Output:
// Outer variable: I am from outer
// Inner variable: I am from inner
```

Here, outerFunction returns innerFunction, which remembers the value of outerVar even after outerFunction has finished. When you call myClosure('I am from inner'), it assigns 'I am from inner' to innerVar and still has access to outerVar. This is another clear example of closure in JavaScript.

## Real-Life Uses of Closures

### 1. Data Privacy (Encapsulation)

Closures allow you to keep variables private, similar to private fields in OOP.

```js
function secretHolder(secret) {
  return {
    getSecret: function () {
      return secret;
    },
  };
}
const holder = secretHolder("hidden");
console.log(holder.getSecret()); // 'hidden'
```

### 2. Function Factories

Closures let you create functions with preset data.

```js
function makeMultiplier(x) {
  return function (y) {
    return x * y;
  };
}
const double = makeMultiplier(2);
console.log(double(5)); // 10
```

### 3. Event Handlers and Callbacks

Closures help you remember state in asynchronous code or event handlers.

```js
document.getElementById("btn").addEventListener("click", function () {
  // This function can access variables from its outer scope
});
```

### 4. Module Pattern

Closures are used to create modules with private and public methods.

```js
const CounterModule = (function () {
  let count = 0;
  return {
    increment: function () {
      count++;
      return count;
    },
    getCount: function () {
      return count;
    },
  };
})();

console.log(CounterModule.increment()); // 1
console.log(CounterModule.getCount()); // 1
```

---

## OOP Comparison: Closures vs Java Private Fields

- In Java, you use private fields in classes to hide data:

```java
public class Counter {
    private int count = 0;
    public int increment() { count++; return count; }
    public int getCount() { return count; }
}
```

- In JavaScript, closures let you hide data inside a function, so only certain functions can access or modify it (see module pattern above).
- Both approaches achieve encapsulation and data privacy, but closures do it with functions, not classes.

---

Closures are a powerful feature in JavaScript for data privacy, function factories, and modular code, similar to how OOP uses private fields and encapsulation in languages like Java.
