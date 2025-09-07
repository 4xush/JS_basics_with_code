# Event Capturing vs Bubbling in JavaScript

## The Third Parameter of addEventListener

```javascript
ul.addEventListener("click", handler, useCapture);
```

### Parameter Values:

- **`useCapture = false`** → Listener runs during the **bubbling phase** (default)
- **`useCapture = true`** → Listener runs during the **capturing phase**

## Practical Example

```javascript
ul.addEventListener(
  "click",
  function (e) {
    let clickedItem = e.target;
    let closestLi = clickedItem.closest("li");
    if (closestLi) {
      console.log("You clicked on " + closestLi.innerText);
    }
  },
  false // 👈 Bubbling phase
);
```

### What `false` means:

- "Run this listener in the bubbling phase when the click event comes back up"
- Click is detected **after** it reaches the target and starts bubbling up
- **Bubbling is the most commonly used phase**
- `false` (or omitting the third parameter) is the usual choice

## Event Propagation Phases

### Scenario: Clicking on `<span>` inside `<li>`

#### 1. Capturing Phase (Top → Down)

```
document → body → ul → li → span
```

- Event travels from root to target
- Listeners with `useCapture = true` fire here
- UL listener (with `true`) will fire **before** the target phase

#### 2. Target Phase

```
The click is actually on <span>
```

- Event reaches the target element
- Target phase listeners fire

#### 3. Bubbling Phase (Bottom → Up)

```
span → li → ul → body → document
```

- Event bubbles back up from target to root
- Listeners with `useCapture = false` fire here
- Body listener (with `false`) will fire here

## Key Differences

### Capturing Phase (`useCapture = true`)

- **Direction**: Top to bottom (root → target)
- **When**: Before the target is reached
- **Use case**: Intercept events before they reach target

### Bubbling Phase (`useCapture = false`)

- **Direction**: Bottom to top (target → root)
- **When**: After target is reached
- **Use case**: Handle events after they've been processed by target

## When It Matters

Setting `useCapture = true` vs `false`:

- **Doesn't make visible difference** for simple cases like highlighting list items
- **Matters significantly** when you have multiple nested listeners
- **Important** when you care about the exact order of execution
- **Crucial** for event handling precedence in complex UIs

## Best Practices

1. **Use Bubbling by Default**

   ```javascript
   element.addEventListener("click", handler); // Defaults to false
   ```

2. **Use Capturing for Special Cases**

   ```javascript
   element.addEventListener("click", handler, true); // Only when needed
   ```

3. **Consider Event Order**

   - Capturing: Parent → Child
   - Bubbling: Child → Parent

4. **Test with Multiple Listeners**
   - Add console.log statements
   - Check execution order
   - Verify expected behavior
