// Throttling: A technique to limit the execution of an event handler function
// even when this event triggers continuously due to user actions.
// Simple throttle function
function throttle(func, limit) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      func.apply(this, args);
      lastCall = now;
    }
  };
}

// Example function to be throttled
function logMessage(msg) {
  console.log(`${new Date().toLocaleTimeString()}: ${msg}`);
}

// Create throttled version (runs at most once every 2 seconds)
const throttledLog = throttle(logMessage, 2000);

// Simulate calling it rapidly
let count = 1;
const interval = setInterval(() => {
  throttledLog(`Message ${count}`);
  count++;
  if (count > 10) clearInterval(interval);
}, 500);
