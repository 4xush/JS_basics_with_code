# JavaScript Event Delegation

Event delegation is a powerful technique in JavaScript that leverages event bubbling to handle events efficiently, especially for multiple elements.

## What is Event Delegation?

Event delegation is a pattern where instead of attaching event listeners to individual elements, you attach a single event listener to a parent element, and then determine which child element triggered the event.

## How It Works

Event delegation works because of event bubbling - when an event occurs on an element, it bubbles up through its ancestors. By listening on a parent, you can "catch" events from all its children.

```javascript
// HTML:
// <ul id="myList">
//   <li>Item 1</li>
//   <li>Item 2</li>
//   <li>Item 3</li>
// </ul>

// Without event delegation (inefficient for many items)
document.querySelectorAll("#myList li").forEach(function (item) {
  item.addEventListener("click", function () {
    console.log("Clicked:", this.textContent);
  });
});

// With event delegation (more efficient)
document.getElementById("myList").addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    console.log("Clicked:", event.target.textContent);
  }
});
```

## Benefits of Event Delegation

1. **Better Performance**: Attaching one event listener instead of many saves memory and improves performance
2. **Dynamic Elements**: Works with elements added to the DOM after page load
3. **Less Code**: Requires less code to manage
4. **Memory Leaks**: Reduces risk of memory leaks from forgotten event listeners
5. **Flexibility**: Easier to add, remove, or change elements without updating event listeners

## Common Use Cases

### Dynamic Content

```javascript
// Works even when items are added dynamically
document.getElementById("todoList").addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-btn")) {
    event.target.closest("li").remove();
  } else if (event.target.classList.contains("edit-btn")) {
    editTodo(event.target.closest("li"));
  }
});

// Now you can freely add new items with the same behavior
function addTodo(text) {
  const list = document.getElementById("todoList");
  list.innerHTML += `
        <li>${text} <button class="edit-btn">Edit</button> <button class="delete-btn">Delete</button></li>
    `;
}
```

### Tables with Many Interactive Elements

```javascript
document
  .getElementById("dataTable")
  .addEventListener("click", function (event) {
    const cell = event.target.closest("td");
    if (!cell) return; // Not clicked on a cell

    const row = cell.parentNode;
    const action = event.target.dataset.action;

    if (action === "edit") {
      editRow(row.dataset.id);
    } else if (action === "delete") {
      deleteRow(row.dataset.id);
    } else if (action === "view") {
      viewDetails(row.dataset.id);
    }
  });
```

## How to Implement Event Delegation

1. Identify a common parent element for the target elements
2. Attach the event listener to the parent
3. In the event handler, check if the event.target (or its parent) is the element you're interested in
4. Take appropriate action based on which element was actually clicked

## Identifying Target Elements

There are several ways to determine if the clicked element is the one you want:

```javascript
// By tag name
if (event.target.tagName === 'LI') { ... }

// By class
if (event.target.classList.contains('item')) { ... }

// By attribute
if (event.target.hasAttribute('data-id')) { ... }

// Using matches() for more complex selectors
if (event.target.matches('.item[data-type="important"]')) { ... }

// Find closest matching parent (for nested elements)
const item = event.target.closest('.item');
if (item) { ... }
```

## Event Delegation with Forms

```javascript
document
  .getElementById("contactForm")
  .addEventListener("change", function (event) {
    // Check validation as user moves between fields
    if (event.target.tagName === "INPUT") {
      validateField(event.target);
    }
  });

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    // Validate all fields on submit
    event.preventDefault();
    if (validateForm(this)) {
      submitForm(this);
    }
  });
```

## Limitations of Event Delegation

1. Not all events bubble (e.g., `focus`, `blur`, `load`, `resize`)
2. Can add complexity for deeply nested elements
3. May require more conditional logic
4. Might be less clear for other developers to understand

## Best Practices

1. Use clear, specific selectors to identify target elements
2. Document the delegation pattern in comments
3. Consider performance in very large DOM structures
4. Return early if the target isn't what you're looking for
5. Use event.currentTarget to reference the element with the listener
