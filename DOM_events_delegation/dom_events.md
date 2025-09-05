# JavaScript DOM Events and Event Handling

## Introduction to DOM Events

DOM Events are actions or occurrences that happen in the browser, which can be detected and responded to with JavaScript. Events can be user-generated (like clicks or keyboard input) or system-generated (like a page finishing loading).

## Types of Events

- **Mouse Events**: `click`, `dblclick`, `mousedown`, `mouseup`, `mousemove`, `mouseover`, `mouseout`
- **Keyboard Events**: `keydown`, `keyup`, `keypress`
- **Form Events**: `submit`, `change`, `focus`, `blur`
- **Window Events**: `load`, `resize`, `scroll`, `unload`
- **Document Events**: `DOMContentLoaded`
- **Touch Events**: `touchstart`, `touchend`, `touchmove`

## Event Handling Basics

### Adding Event Listeners

```javascript
// Get a reference to the element
const button = document.getElementById("myButton");

// Add event listener
button.addEventListener("click", function () {
  console.log("Button was clicked!");
});

// With named function
function handleClick() {
  console.log("Button clicked with named function");
}
button.addEventListener("click", handleClick);

// Arrow function
button.addEventListener("click", () => {
  console.log("Button clicked with arrow function");
});
```

### Removing Event Listeners

```javascript
// To remove an event listener, you need a reference to the function
button.removeEventListener("click", handleClick);

// Note: You cannot remove anonymous functions this way
```

## The Event Object

When an event occurs, an event object is automatically passed to the event handler function. This object contains information about the event.

```javascript
button.addEventListener("click", function (event) {
  console.log("Event type:", event.type);
  console.log("Target element:", event.target);
  console.log("Current target:", event.currentTarget);
  console.log("Mouse coordinates:", event.clientX, event.clientY);
  console.log("Timestamp:", event.timeStamp);
});
```

## Event Propagation

Events in the DOM propagate through capturing and bubbling phases, which allows them to travel through the DOM tree.

**For detailed information, see:** [Event Propagation](event_propagation.md)

## Event Delegation

Event delegation is a pattern where you attach a single event listener to a common parent element instead of many listeners on individual child elements.

**For detailed information, see:** [Event Delegation](event_delegation.md)

### Event Bubbling

**For detailed information, see:** [Event Propagation](event_propagation.md)

## Event Delegation

Event delegation is a pattern where you attach a single event listener to a common parent element instead of many listeners on individual child elements.

**For detailed information, see:** [Event Delegation](event_delegation.md)

## Preventing Default Behavior

### Event Capturing (Trickling)

The opposite of bubbling. To catch an event on the capturing phase, set the third argument of `addEventListener` to `true`:

```javascript
parentElement.addEventListener(
  "click",
  function () {
    console.log("Parent captured the event!");
  },
  true
); // true enables capturing

childElement.addEventListener("click", function () {
  console.log("Child was clicked!");
});

// When child is clicked, you'll see:
// "Parent captured the event!"
// "Child was clicked!"
```

**For detailed information, see:** [Event Delegation](event_delegation.md)

## Preventing Default Behavior

Some events have default actions (like links navigating or forms submitting). You can prevent these with `preventDefault()`:

```javascript
document.getElementById("myLink").addEventListener("click", function (event) {
  event.preventDefault();
  console.log("Link click was intercepted!");
});

document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();
  console.log("Form submission was prevented!");
});
```

## Custom Events

You can create and dispatch your own events:

```javascript
// Create custom event
const customEvent = new CustomEvent("awesome", {
  bubbles: true,
  cancelable: true,
  detail: { time: new Date(), message: "Hello World" },
});

// Listen for custom event
element.addEventListener("awesome", function (event) {
  console.log("Custom event received!", event.detail);
});

// Dispatch the event
element.dispatchEvent(customEvent);
```

## Common Event Use Cases

### Form Validation

```javascript
form.addEventListener("submit", function (event) {
  const input = document.getElementById("email");
  if (!isValidEmail(input.value)) {
    event.preventDefault();
    showError("Please enter a valid email");
  }
});
```

### Keyboard Shortcuts

```javascript
document.addEventListener("keydown", function (event) {
  if (event.ctrlKey && event.key === "s") {
    event.preventDefault();
    saveDocument();
  }
});
```

### Drag and Drop

```javascript
dragElement.addEventListener("dragstart", handleDragStart);
dropTarget.addEventListener("dragover", handleDragOver);
dropTarget.addEventListener("drop", handleDrop);
```

## Event Performance Tips

1. Use event delegation where possible
2. Remove event listeners when they're no longer needed
3. Throttle or debounce event handlers for events like resize or scroll
4. Be cautious with event handlers in loops
5. Use passive event listeners for touch and wheel events

## DOM Event Browser Compatibility

Most modern browsers support the standard DOM Event API, but there are some differences, especially in older browsers. Always check compatibility on sites like MDN or caniuse.com when using specific event features.
