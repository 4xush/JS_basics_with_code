# 🔹 Callback Hell in JavaScript

**Definition:**
**Callback Hell** occurs when you have **nested callbacks** for asynchronous operations, resulting in **code that is hard to read, maintain, and debug**.

It’s sometimes called **“Pyramid of Doom”** because the code structure looks like a pyramid due to deep nesting.

---

## 📌 Example of Callback Hell

```js
doSomething(function(result1) {
  doSomethingElse(result1, function(result2) {
    doAnotherThing(result2, function(result3) {
      doFinalThing(result3, function(result4) {
        console.log("All done: " + result4);
      });
    });
  });
});
```

**Problems:**

1. **Readability** → hard to follow the flow.
2. **Maintainability** → difficult to add/remove steps.
3. **Error handling** → becomes messy; must check errors at every level.

---

## 📌 Why Callback Hell Happens

* JavaScript is **single-threaded** and **asynchronous**, so developers use **callbacks** for async tasks.
* Multiple dependent async tasks result in **nested functions**.

---

## 📌 Solutions to Callback Hell

1. **Named Functions**

   * Break nested callbacks into **separate named functions**.

```js
function step1(result1) { step2(result1); }
function step2(result2) { step3(result2); }
function step3(result3) { step4(result3); }

doSomething(step1);
```

2. **Promises**

   * Flatten nested callbacks using `.then()` chaining.

```js
doSomething()
  .then(result1 => doSomethingElse(result1))
  .then(result2 => doAnotherThing(result2))
  .then(result3 => doFinalThing(result3))
  .then(result4 => console.log("All done: " + result4))
  .catch(err => console.error(err));
```

3. **Async / Await**

   * Make async code **look synchronous**, very readable.

```js
async function main() {
  try {
    const result1 = await doSomething();
    const result2 = await doSomethingElse(result1);
    const result3 = await doAnotherThing(result2);
    const result4 = await doFinalThing(result3);
    console.log("All done: " + result4);
  } catch (err) {
    console.error(err);
  }
}

main();
```

---

## ✅ Summary

* **Callback Hell** = deep nested callbacks → pyramid shape → hard to read/maintain.
* **Caused by** → multiple dependent async tasks using callbacks.
* **Solved by** → Named functions, Promises, Async/Await.

---
