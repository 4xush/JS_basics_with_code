# JavaScript Event Propagation

Event propagation describes how events travel through the DOM tree. Understanding this is crucial for proper event handling in JavaScript applications.

## Three Phases of Event Propagation

When an event occurs in the DOM, it moves through three phases:

1. **Capturing Phase** - Event travels from the `window` down through the DOM tree to the target element
2. **Target Phase** - Event reaches the target element
3. **Bubbling Phase** - Event bubbles up from the target element back to the `window`


## Event Bubbling

Bubbling is the default behavior where an event starts at the target element and bubbles up through its ancestors.

```javascript
// HTML:
// <div id="parent">
//   <button id="child">Click Me</button>
// </div>

// Event handlers
document.getElementById("parent").addEventListener("click", function (event) {
  console.log("Parent was clicked!");
});

document.getElementById("child").addEventListener("click", function (event) {
  console.log("Child was clicked!");
});

// When child is clicked, output will be:
// "Child was clicked!"
// "Parent was clicked!"
```

### Use Cases for Event Bubbling

- Event delegation (discussed separately)
- Notification systems where parent components need to know about child events
- Simplifying event handling in complex component hierarchies

## Event Capturing (Trickling)

Capturing happens before bubbling. The event travels from the window down to the target element.

```javascript
// To listen for events in the capturing phase, set the third parameter to true
document.getElementById("parent").addEventListener(
  "click",
  function (event) {
    console.log("Parent captured the event!");
  },
  true
); // true enables capturing phase

document.getElementById("child").addEventListener("click", function (event) {
  console.log("Child was clicked!");
});

// When child is clicked, output will be:
// "Parent captured the event!"
// "Child was clicked!"
```

### Use Cases for Event Capturing

- Intercepting events before they reach their targets
- Preprocessing events before normal handlers
- Rarely used in everyday code compared to bubbling

## Stopping Event Propagation

Sometimes you want to prevent an event from continuing its propagation:

```javascript
document.getElementById("child").addEventListener("click", function (event) {
  event.stopPropagation();
  console.log("Child clicked, but event will not bubble up!");
});

// When child is clicked, only "Child clicked..." will be logged
```

### Methods for Controlling Propagation

- `event.stopPropagation()` - Stops the event from bubbling up or capturing down, but allows other event handlers on the current element to run
- `event.stopImmediatePropagation()` - Stops propagation AND prevents other event handlers on the same element from running
- `event.preventDefault()` - Doesn't stop propagation, but prevents the default browser action (e.g., following links)

## Event.currentTarget vs Event.target

- `event.target` - The element that triggered the event (e.g., the button that was clicked)
- `event.currentTarget` - The element that the event handler is attached to

This difference is important for event delegation:

```javascript
document.getElementById("parent").addEventListener("click", function (event) {
  console.log("event.target:", event.target.id); // 'child' (if child was clicked)
  console.log("event.currentTarget:", event.currentTarget.id); // 'parent'
});
```

## Event Propagation and Event Delegation

Event delegation (covered in a separate note) is an important application of event bubbling, where a single event handler on a parent element can manage events for multiple child elements.

## Best Practices

1. **Know when to stop propagation**: Only use `stopPropagation()` when you have a specific reason to prevent bubbling
2. **Be cautious with capturing**: The capturing phase is rarely needed and can cause confusion
3. **Understand event.target vs event.currentTarget**: This is especially important for event delegation
4. **Document your propagation control**: If you stop propagation, add a comment explaining why, as it can affect other event handlers
