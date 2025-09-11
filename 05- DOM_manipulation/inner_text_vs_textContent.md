# innerText vs textContent in JavaScript

## HTML Example

```html
<div id="demo">
  Visible Text
  <span style="display:none;"> + Hidden Text</span>
</div>
```

## Key Differences

### textContent

- **Returns**: All text content from the DOM, including hidden elements
- **CSS-aware**: Ignores CSS `display: none` - includes hidden text
- **Performance**: Faster, doesn't trigger reflow
- **Security**: Safe from XSS when setting text

### innerText

- **Returns**: Only visible text content
- **CSS-aware**: Respects CSS visibility rules
- **Performance**: Slower, triggers reflow/layout
- **Security**: Same XSS considerations as textContent

## When to Use textContent ✅

### Use Cases:

- **Raw text extraction** from DOM regardless of visibility
- **Better performance** (no reflow triggering)
- **Plain text setting** (XSS safe, unlike innerHTML)
- **Hidden content inclusion** needed

### Practical Examples:

- **Web scraping** or extracting all text from an element
- **Copying text** that may include hidden content
- **Fast bulk DOM updates** where performance matters
- **Data extraction** for processing

## Code Examples

### Getting Text Content

```javascript
const element = document.getElementById("demo");

// textContent - includes hidden text
console.log(element.textContent);
// Output: "Visible Text + Hidden Text"

// innerText - only visible text
console.log(element.innerText);
// Output: "Visible Text"
```

### Setting Text Content

```javascript
const element = document.getElementById("demo");

// Safe text setting
element.textContent = "New <b>safe</b> text";
// Renders: New <b>safe</b> text (tags not interpreted)

// XSS vulnerable if using innerHTML
element.innerHTML = userInput; // ⚠️ Dangerous
```

## Performance Comparison

```javascript
// textContent - Fast, no layout recalculation
element.textContent = "New text";

// innerText - Slower, triggers reflow
element.innerText = "New text";
```

## Browser Compatibility

- **textContent**: Modern browsers + IE9+
- **innerText**: Modern browsers + IE (older support)

## Best Practices

1. **Use textContent for data extraction**

   ```javascript
   const data = element.textContent.trim();
   ```

2. **Use textContent for safe text updates**

   ```javascript
   element.textContent = safeText;
   ```

3. **Use innerText for user-visible content**

   ```javascript
   const visibleText = element.innerText;
   ```

4. **Consider performance for bulk operations**
   ```javascript
   // Faster for multiple updates
   elements.forEach((el) => (el.textContent = newValue));
   ```

## Common Pitfalls

- **Forgetting CSS visibility**: textContent includes hidden text
- **Performance impact**: innerText can cause layout thrashing
- **XSS vulnerability**: Don't use innerHTML for user input
- **Whitespace handling**: Both preserve whitespace differently

## Summary Table

| Property    | Hidden Text | Performance | CSS Aware | Use Case        |
| ----------- | ----------- | ----------- | --------- | --------------- |
| textContent | ✅ Included | ⚡ Fast     | ❌ No     | Data extraction |
| innerText   | ❌ Excluded | 🐌 Slow     | ✅ Yes    | User display    |
