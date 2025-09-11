// var_const_let_demo.js
// Demonstrates the differences between var, let, and const in JavaScript

// 1. var: function-scoped, can be re-declared and updated
function varExample() {
    var x = 1;
    if (true) {
        var x = 2; // same variable!
        console.log('Inside if, var x =', x); // 2
    }
    console.log('Outside if, var x =', x); // 2
}

// 2. let: block-scoped, can be updated but not re-declared in the same scope
function letExample() {
    let y = 1;
    if (true) {
        let y = 2; // different variable (block scope)
        console.log('Inside if, let y =', y); // 2
    }
    console.log('Outside if, let y =', y); // 1
}

// 3. const: block-scoped, cannot be updated or re-declared
function constExample() {
    const z = 1;
    // z = 2; // Error: Assignment to constant variable
    if (true) {
        const z = 2; // different variable (block scope)
        console.log('Inside if, const z =', z); // 2
    }
    console.log('Outside if, const z =', z); // 1
}

// 4. Hoisting
function hoistingExample() {
    console.log(a); // undefined (var is hoisted)
    var a = 5;
    // console.log(b); // ReferenceError (let/const are not hoisted the same way)
    let b = 10;
}

// Run all examples
console.log('--- var example ---');
varExample();
console.log('--- let example ---');
letExample();
console.log('--- const example ---');
constExample();
console.log('--- hoisting example ---');
hoistingExample();

// Summary:
// - Use let and const (prefer const) in modern JS.
// - Avoid var unless you need function-scoping for legacy code.
