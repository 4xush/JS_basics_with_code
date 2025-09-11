// closure_example.js
// Demonstrates closure in JavaScript with explanation and examples

// What is a closure?
// A closure is a function that remembers its outer variables even after the outer function has finished executing.

function outerFunction(outerVar) {
    return function innerFunction(innerVar) {
        console.log('Outer variable:', outerVar);
        console.log('Inner variable:', innerVar);
    };
}

// Example usage:
const myClosure = outerFunction('I am from outer');
myClosure('I am from inner');
// Output:
// Outer variable: I am from outer
// Inner variable: I am from inner

// Another example: Counter using closure

// Counter example with inline explanation:
function makeCounter() {
    let count = 0; // 'count' is created fresh for each makeCounter() call
    return function () {
        count++; // This function can access and modify 'count' even after makeCounter() has finished
        return count; // The value of 'count' is preserved between calls to this returned function
    };
}

const counter1 = makeCounter(); // counter1 has its own 'count' variable
console.log(counter1()); // 1 (count starts at 0, then increments to 1)
console.log(counter1()); // 2 (count is now 2 for counter1)

const counter2 = makeCounter(); // counter2 gets a new, separate 'count' variable
console.log(counter2()); // 1 (counter2's count starts at 0, independent of counter1)

// Explanation:
// - innerFunction forms a closure over outerVar.
// - The counter function remembers its own count variable, even after makeCounter() has finished.
// - Closures are useful for data privacy and function factories.
