# 📘 DOM Manipulation Cheat Sheet (JS)

This guide covers the **essential DOM functions & properties** you need to know for injecting, modifying, and removing content in HTML.

---

## 📌 1. Getting / Setting Content

### `element.textContent`
- Gets/sets **all the text inside an element**, even if it’s hidden with CSS.
- Returns exactly what’s in the DOM, without formatting.
- Does **not** parse HTML.

```js
div.textContent = "Hello <b>World</b>";
// Renders literally: Hello <b>World</b>
```

✅ **Fast** because it doesn’t trigger layout reflow.  
❌ Includes hidden text.  

---

### `element.innerText`
- Gets/sets **only visible text** (respects CSS like `display:none` and `text-transform`).
- Forces layout reflow → slower than `textContent`.

```js
div.innerText = "Hello <b>World</b>";
// Renders: Hello <b>World</b> (no bold applied)
```

✅ Reflects what the user actually **sees**.  
❌ Slower (triggers reflow).  

---

### `element.innerHTML`
- Gets/sets the **HTML markup inside** an element.
- Parses and injects HTML.

```js
div.innerHTML = "Hello <b>World</b>";
// Renders: Hello World (with bold)
```

⚠️ **Security Warning**: Don’t inject user input directly → XSS risk.  
Use `textContent` instead if you only need plain text.

---

### 🔎 Quick Comparison: `textContent` vs `innerText`

| Feature            | `textContent` | `innerText` |
|--------------------|---------------|-------------|
| Hidden elements    | ✅ Included   | ❌ Ignored  |
| Reads CSS styling  | ❌ No         | ✅ Yes      |
| Performance        | 🚀 Fast       | 🐢 Slower (reflow) |
| HTML Parsing       | ❌ No         | ❌ No       |

---

## 📌 2. Attributes

### `element.setAttribute(name, value)`
```js
img.setAttribute("src", "photo.jpg");
button.setAttribute("disabled", true);
```

### `element.getAttribute(name)`
```js
console.log(img.getAttribute("src"));
```

### Shorthand Properties
```js
img.src = "photo.jpg";
input.value = "Hello";
checkbox.checked = true;
```

---

## 📌 3. Creating / Adding Elements

### `document.createElement(tag)`
```js
const p = document.createElement("p");
p.textContent = "This is new!";
```

### `parent.appendChild(node)`
```js
document.body.appendChild(p);
```

### `parent.append(nodeOrText)`
```js
div.append("Plain text", p);
```

### `parent.prepend(node)`
```js
div.prepend(p);
```

### `element.insertAdjacentHTML(position, html)`
Positions:
- `"beforebegin"`
- `"afterbegin"`
- `"beforeend"`
- `"afterend"`

```js
div.insertAdjacentHTML("beforeend", "<p>Inserted!</p>");
```

---

## 📌 4. Removing / Replacing

### `element.remove()`
```js
p.remove();
```

### `parent.replaceChild(newNode, oldNode)`
```js
parent.replaceChild(newDiv, oldDiv);
```

---

## 📌 5. Classes & Styles

### `element.classList`
```js
div.classList.add("active");
div.classList.remove("hidden");
div.classList.toggle("open");
console.log(div.classList.contains("active"));
```

### `element.style`
```js
div.style.backgroundColor = "yellow";
div.style.display = "none";
```

---

## ✅ Summary

The **must-know DOM APIs** for interviews/projects:
- `textContent`, `innerText`, `innerHTML`
- `setAttribute`, `getAttribute`
- `createElement`, `appendChild`, `append`, `prepend`
- `remove`, `replaceChild`
- `classList` methods
- `style` manipulation
