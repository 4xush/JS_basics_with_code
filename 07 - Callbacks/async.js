/*

function getData() {
  let data = "My Secret Data!";
  return new Promise((resolve,reject)=>{
    console.log("Data is processing...");
    setTimeout(()=>{
      resolve(data);
    },1000);
  });
}

console.log(await getData()); // ❌ Error



1️⃣ Problem with await at the bottom

In Node.js (and most browsers outside ES modules), you cannot use await at the top level.
You’ll get:

✅ Fix: wrap it in an async function:

async function main() {
  console.log(await getData());
}
main();
*/


// async function fetchUser() {
//   try {
//     console.log("Fetching user data...");
//     const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
//     const data = await response.json();
//     console.log("Got data:", data);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

function fetchUser() {
    console.log("Fetching user data... via Promise + .then");
    return new Promise((resolve, reject) => {
        fetch("https://jsonplaceholder.typicode.com/users/1")
            .then(response => response.json())
            .then(data => {
                console.log("Got data:", data);
                resolve(data);
            })
            .catch(error => {
                console.error("Error:", error);
                reject(error);
            });
    })
}

fetchUser();
        /*
        Step by step

        fetch(...)
        Returns a Promise that resolves to a Response object.

        .then(response => response.json())

        The arrow function receives the resolved response.

        response.json() itself returns a Promise that resolves to the actual parsed JSON.

        Because you returned it from the .then(...) callback, the next .then(...) in the chain waits for that JSON promise.

        .then(data => { ... })

        The previous step gave back the parsed JSON.

        Now data is the actual JavaScript object (the JSON from the API).
*/
async function fetchUser2() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
        const data = await response.json(); // again await while parsing in json
        console.log("Got data:", data);
        return data; // ✅ this is like resolve(data)
    } catch (error) {
        console.error("Error:", error);
        throw error; // ✅ this is like reject(error)
    }
}

async function main() {
    const user = await fetchUser2();
    console.log("Now with async/await:\n");
    console.log("User in main:", user);
}

main();


/*
❗ Why "Now with async/await: "two prints?

Because you literally defined fetchUser twice in the same file:

The first definition (Promise + .then)

The second definition (async/await) → overwrites the first one

So what happens:

First fetchUser(); runs the old version (Promise version) → logs once ✅

Then main(); runs the new async/await version → logs twice (inside + in main) ✅ */