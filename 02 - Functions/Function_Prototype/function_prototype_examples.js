// Function.prototype examples in JavaScript

// 1. Basic Function.prototype.call() Example
console.log('\n--- Example 1: call() ---');
const person = {
    name: 'John',
    greet: function (message) {
        console.log(`${message} ${this.name}!`);
    }
};

const anotherPerson = {
    name: 'Alice'
};

// Using call to borrow greet method
person.greet.call(anotherPerson, 'Hello'); // Output: Hello Alice!

// 2. Function.prototype.apply() Example
console.log('\n--- Example 2: apply() ---');
function sum(a, b, c) {
    return a + b + c;
}

const numbers = [1, 2, 3];
const result = sum.apply(null, numbers);
console.log('Sum:', result); // Output: Sum: 6

// 3. Function.prototype.bind() Example
console.log('\n--- Example 3: bind() ---');
const user = {
    name: 'Bob',
    sayHi: function () {
        console.log(`Hi, I'm ${this.name}`);
    }
};

const boundFunction = user.sayHi.bind(user);
setTimeout(boundFunction, 100); // Will correctly print "Hi, I'm Bob"

// 4. Method Borrowing Example
console.log('\n--- Example 4: Method Borrowing ---');
const calculator = {
    num: 5,
    add: function (a) {
        return this.num + a;
    }
};

const calculator2 = {
    num: 10
};

console.log(calculator.add.call(calculator2, 5)); // Output: 15

// 5. Creating Custom Methods using Function.prototype
console.log('\n--- Example 5: Custom prototype method ---');
Function.prototype.repeat = function (times) {
    const fn = this;
    return function (...args) {
        for (let i = 0; i < times; i++) {
            fn.apply(this, args);
        }
    };
};

function sayHello(name) {
    console.log(`Hello ${name}!`);
}

const sayHelloThrice = sayHello.repeat(3);
sayHelloThrice('World');

// 6. Practical Example: Function Currying
console.log('\n--- Example 6: Function Currying ---');
function multiply(a, b) {
    return a * b;
}

// Create a new function that pre-sets the first argument
const multiplyByTwo = multiply.bind(null, 2);
console.log(multiplyByTwo(4)); // Output: 8

// 7. Context Preservation Example
console.log('\n--- Example 7: Context Preservation ---');
const counter = {
    count: 0,
    increment: function () {
        this.count++;
        console.log(this.count);
    }
};

// Wrong way - loses context
const wrongIncrement = counter.increment;
// wrongIncrement(); // Would cause error or NaN

// Right way - preserves context
const rightIncrement = counter.increment.bind(counter);
rightIncrement(); // Output: 1

// 8. Arguments to Array conversion
console.log('\n--- Example 8: Arguments handling ---');
function printArgs() {
    // Convert arguments to array using Array.prototype.slice
    const args = Array.prototype.slice.call(arguments);
    console.log('Arguments as array:', args);
}

printArgs(1, 2, 3, 'hello');

// 9. Inheritance using call
console.log('\n--- Example 9: Simple Inheritance ---');
function Animal(name) {
    this.name = name;
}

function Dog(name, breed) {
    Animal.call(this, name); // Call parent constructor
    this.breed = breed;
}

const myDog = new Dog('Rex', 'German Shepherd');
console.log(myDog); // Output: Dog { name: 'Rex', breed: 'German Shepherd' }

// 10. Bonus: Function composition using bind
console.log('\n--- Example 10: Function Composition ---');
function addOne(x) { return x + 1; }
function double(x) { return x * 2; }

// Create a composed function
const addOneThenDouble = double.bind(null, addOne(5));
console.log(addOneThenDouble()); // Output: 12 (5 + 1 = 6, then 6 * 2 = 12)

/*
Key Takeaways:

1. call() vs apply() vs bind():
   - call(): Executes function immediately with given this and comma-separated arguments
   - apply(): Same as call but takes arguments as array
   - bind(): Returns new function with fixed this and optional preset arguments

2. Common Use Cases:
   - Method borrowing
   - Context preservation
   - Partial application (currying)
   - Inheritance implementation
   - Array-like object conversion

3. Best Practices:
   - Use bind() for event handlers to preserve context
   - Use call()/apply() for method borrowing
   - Consider arrow functions as alternative for context binding
   - Be careful with this context in callbacks
*/
