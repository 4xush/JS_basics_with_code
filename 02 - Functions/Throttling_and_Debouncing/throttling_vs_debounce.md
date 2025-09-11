## 🔹 **Definition**

Both **debouncing** and **throttling** are techniques to **control how often a function is executed**, especially useful for events that can fire frequently like `scroll`, `resize`, or `keyup`.

---

### **1️⃣ Debouncing**

**Definition:**
Debouncing ensures that a function is **executed only after a certain delay has passed without it being called again**.

* It delays execution until the event “settles”.
* If the event keeps firing, the timer resets.

**Use Case:**

* Search input autocomplete (fire API request **only after user stops typing**).
* Window resize handling (fire function **after user finishes resizing**).

**Example:**

```js
function debounce(func, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

// Usage
const search = (query) => console.log("Searching for", query);
const debouncedSearch = debounce(search, 500);

document.getElementById("input").addEventListener("keyup", (e) => {
  debouncedSearch(e.target.value);
});
```

✅ Here, `search` runs **only 500ms after the user stops typing**.

---

### **2️⃣ Throttling**

**Definition:**
Throttling ensures that a function is **executed at most once every specified interval**, no matter how many times the event fires.

* Limits execution rate.
* Useful for continuous events.

**Use Case:**

* Scroll events (update position **every 200ms**, not every pixel).
* Window resizing or mouse movement (perform action **periodically**).

**Example:**

```js
function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function(...args) {
    if (!lastRan) {
      func.apply(this, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(this, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

// Usage
const onScroll = () => console.log("Scroll event!");
window.addEventListener("scroll", throttle(onScroll, 200));
```

✅ Here, `onScroll` runs **at most once every 200ms**, no matter how fast you scroll.

---

## 🔹 **Key Differences**

| Feature                | Debouncing                            | Throttling                                                |
| ---------------------- | ------------------------------------- | --------------------------------------------------------- |
| When function executes | After a **pause** in events           | At **regular intervals**                                  |
| Purpose                | **Delay execution** until event stops | **Limit execution** frequency                             |
| Common use cases       | Search inputs, resizing, keyup        | Scroll events, mouse movement, API calls with rate limits |
| Function calls         | Only **once after last event**        | **Multiple times**, but limited by interval               |

---

💡 **Quick analogy:**

* **Debounce**: Wait until everyone stops talking before you reply.
* **Throttle**: Speak only once every 2 minutes, no matter how much people talk.

---
