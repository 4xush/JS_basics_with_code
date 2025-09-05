
# JavaScript Basic Notes

## Module Imports and Top-Level Code

- When you import any function or variable from a JavaScript file, all the top-level code in that file runs automatically.
- Only code inside functions or classes will not run until called.
- Avoid putting executable code at the top level of modules meant for import.
- Use the following pattern for reusable modules:

```js
// myModule.js
function myFunction() {
  // ...function code...
}

export { myFunction };

// Only runs if executed directly, not when imported
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(myFunction());
}
```

## Variable Basics

- Variables can be declared with `let`, `const`, or `var` (prefer `let` and `const`).
- Functions can be declared with `function` or as arrow functions (`const f = () => {}`).
- Use `import`/`export` for modules (ESM), or `require`/`module.exports` for CommonJS (Node.js default before ES modules).
- Always keep reusable code inside functions or classes for better modularity.

```js
function hoistingExample() {
  console.log(a); // undefined (var is hoisted)
  var a = 5;
  // console.log(b); // ReferenceError (let/const are not hoisted the same way)
  let b = 10;
}
```

The line console.log(a); prints undefined because of "hoisting." With var, the variable declaration (var a) is moved to the top of the function, but its value is not assigned until the code runs that line. So, before var a = 5; runs, a exists but is undefined. After that line, a will be 5. This shows why var can be confusing and why let/const are preferred—they do not allow access before declaration.

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
