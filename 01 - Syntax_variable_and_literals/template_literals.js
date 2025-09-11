// Template Literals in JavaScript
// Also known as Template Strings (introduced in ES6)

// 1. Basic Syntax - using backticks (``)
const basicString = `This is a template literal`;
console.log(basicString);

// 2. Multiline Strings
const multilineString = `
    This is a multiline
    template literal
    that preserves line breaks
    and spacing
`;
console.log(multilineString);

// 3. String Interpolation (embedding expressions)
const name = 'John';
const age = 25;
console.log(`My name is ${name} and I am ${age} years old`);

// 4. Expression Evaluation
const a = 10;
const b = 20;
console.log(`Sum of ${a} and ${b} is ${a + b}`);

// 5. Using Template Literals with Functions
function greet(name) {
    return `Hello, ${name}!`;
}
console.log(greet('Alice'));

// 6. Nesting Templates
const isLoggedIn = true;
const username = 'user123';
const message = `
    ${isLoggedIn ? `Welcome back, ${username}!` : 'Please log in'}
`;
console.log(message);

// 7. Tagged Templates

// const customTag = (strings, ...values) =>{
function customTag(strings, ...values) {
    console.log('Strings:', strings);
    console.log('Values:', values);
    return strings.reduce((result, str, i) =>
        `${result}${str}${values[i] || ''}`
        , '');
}

const item = 'bottle';
const price = 19.99;
const taggedResult = customTag`This ${item} costs $${price}`;
console.log(taggedResult);

// Practical Example - HTML Template
const product = {
    name: 'Laptop',
    price: 999.99,
    description: 'High-performance laptop'
};

const htmlTemplate = `
    <div class="product">
        <h2>${product.name}</h2>
        <p class="price">$${product.price}</p>
        <p class="description">${product.description}</p>
    </div>
`;

console.log(htmlTemplate);
