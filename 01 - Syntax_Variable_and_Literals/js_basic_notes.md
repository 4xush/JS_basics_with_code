
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
