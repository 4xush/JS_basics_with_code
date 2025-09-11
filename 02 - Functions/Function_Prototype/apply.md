### **1️⃣ What happens if you just do `sum(numbers)`?**

```js
function sum(a, b, c) {
    return a + b + c;
}

const numbers = [1, 2, 3];
console.log(sum(numbers)); 
```

* Here, `a = [1,2,3]`, and `b` and `c` are `undefined`.
* So JS tries to do `[1,2,3] + undefined + undefined` → results in **string concatenation or NaN**, not what you want.

```js
sum(numbers); // Output: "1,2,3undefinedundefined" or NaN depending on usage
```

* JavaScript **doesn’t automatically unpack arrays** into function arguments.

---

### **2️⃣ Why use `.apply()`?**

`.apply()` allows you to **pass an array of arguments** and **spread them as individual arguments**:

```js
const result = sum.apply(null, numbers);
```

* `numbers = [1,2,3]`
* `.apply()` effectively calls: `sum(1, 2, 3)`
* Result → `6` ✅

---

### **3️⃣ Modern alternative: Spread operator**

With ES6, you can do the same thing **without `.apply()`** using the spread operator:

```js
const result = sum(...numbers); // sum(1, 2, 3)
console.log(result); // 6
```

* So in modern JS, `.apply()` is often replaced by **spread syntax**.
* `.apply()` is still useful when you **don’t know the length of the argument array in advance** or for **older JS code**.

---

### **4️⃣ Summary**

| Call                       | How args are passed             | Works?    |
| -------------------------- | ------------------------------- | --------- |
| `sum(numbers)`             | `numbers` as single argument    | ❌ wrong   |
| `sum.apply(null, numbers)` | Array unpacked as separate args | ✅ correct |
| `sum(...numbers)`          | ES6 spread syntax               | ✅ correct |

---

💡 **Tip:**
`.apply()` is also handy when **you want to control `this`** for a function. That’s why it’s used a lot in `throttle`, `debounce`, and `method borrowing`.

---