// DOM Selectors in JavaScript

// First, let's create a sample HTML structure in a string (for demonstration)
const sampleHTML = `
<!DOCTYPE html>
<html>
<body>
    <div id="main-container">
        <h1 class="title">DOM Selectors Demo</h1>
        
        <div class="section">
            <p class="text">First paragraph</p>
            <p class="text highlight">Second paragraph</p>
            <p class="text">Third paragraph</p>
        </div>
        
        <ul id="list">
            <li data-id="1">Item 1</li>
            <li data-id="2" class="selected">Item 2</li>
            <li data-id="3">Item 3</li>
        </ul>
        
        <form name="myForm">
            <input type="text" name="username" />
            <input type="email" name="email" />
        </form>
    </div>
</body>
</html>
`;

// Basic DOM Selectors:

// 1. getElementById
const mainContainer = document.getElementById('main-container');
// Returns a single element with id="main-container"

// 2. getElementsByClassName
const textElements = document.getElementsByClassName('text');
// Returns HTMLCollection of elements with class="text"

// 3. getElementsByTagName
const paragraphs = document.getElementsByTagName('p');
// console.log(paragraphs);
// Returns HTMLCollection of all <p> elements

// 4. querySelector
const title = document.querySelector('.title');
// Returns the first element that matches the CSS selector

// 5. querySelectorAll
const allParagraphs = document.querySelectorAll('p.text');
// Returns NodeList of all elements matching the CSS selector

// 6. getElementsByName
const emailInput = document.getElementsByName('email');
// Returns NodeList of elements with name="email"

// Advanced Selectors using querySelector/querySelectorAll:

// Select by ID
const list = document.querySelector('#list');

// Select by Class
const highlightedText = document.querySelector('.text.highlight');

// Select by Attribute
const dataItems = document.querySelectorAll('[data-id]');

// Select by Attribute Value
const item2 = document.querySelector('[data-id="2"]');

// Select Child Elements
const firstListItem = document.querySelector('ul li:first-child');
const lastListItem = document.querySelector('ul li:last-child');

// Select by Complex CSS Selectors
const selectedItems = document.querySelectorAll('li.selected');

const formInputs = document.querySelectorAll('form[name="myForm"] input');

// Combining Multiple Selectors
const textOrSelected = document.querySelectorAll('.text, .selected');

// Using Child Selectors
const directChildren = document.querySelectorAll('#main-container > div');

// Example of working with selected elements
function demonstrateSelectors() {
    // Get elements by class name (returns HTMLCollection)
    const textElements = document.getElementsByClassName('text');
    for (let element of textElements) {
        element.style.color = 'blue';
    }

    // Get elements by tag name (returns HTMLCollection)
    const paragraphs = document.getElementsByTagName('p');
    Array.from(paragraphs).forEach(p => {
        p.style.fontFamily = 'Arial';
    });

    // Using querySelector (returns single element)
    const title = document.querySelector('.title');
    if (title) {
        title.style.fontSize = '24px';
    }

    // Using querySelectorAll (returns NodeList)
    const listItems = document.querySelectorAll('#list li');
    listItems.forEach((item, index) => {
        item.textContent += ` (${index + 1})`;
    });
}

// Note: This code needs to be run in a browser environment with the HTML structure
// The sampleHTML string is just for reference
