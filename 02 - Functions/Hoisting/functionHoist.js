try {
baz(); // ReferenceError: Cannot access 'baz' before initialization
} catch (e) {
  console.log(e.message);
}
const baz = () => console.log("Arrow");
baz(); // Works fine after initialization