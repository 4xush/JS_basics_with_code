// Example 1: Call Stack Demonstration
function first() {
    console.log('1: First');
    second();
}

function second() {
    console.log('2: Second');
    third();
}

function third() {
    console.log('3: Third');
}

first();

// Example 2: Event Loop and Queues
console.log('1' + " main stack - starts");
setTimeout(() => console.log('2' + " macrotask queue from global execution"), 0);
Promise.resolve().then(() => console.log('3' + " microtask queue from global execution"));
console.log('4' + " main stack - again");

// Example 3: Non-blocking Computation
function nonBlockingComputation(start = 0) {
    if (start >= 1000000000) return;

    // Process only 1000 items at a time
    for (let i = start; i < Math.min(start + 1000, 1000000000); i++) {
        // doing something heavy
    }

    setTimeout(() => {
        nonBlockingComputation(start + 1000);
    }, 0);
}

// Example 4: Async/Await and Event Loop
async function example() {
    console.log('1' + " main stack - from async function");
    await Promise.resolve();
    console.log('2' +" microtask queue : 1 - from async function");
    setTimeout(() => console.log('3' + " macrotask queue from async function"), 0);
    await Promise.resolve();
    console.log('4' + " microtask queue : 2 - from async function");
}

example();
console.log('5' +" main stack - after calling async function");
