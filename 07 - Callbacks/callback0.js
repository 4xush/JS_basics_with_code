
// The print function takes a callback function as an argument
function print(callback) {
    // setTimeout is used to simulate an asynchronous operation (1 second delay)
    setTimeout(() => {
        // After 1 second, the callback is called with the string "Hello World!"
        callback("Hello World!");
    }, 1000);
}



// Here, we call print and pass console.log as the callback function
// So, after 1 second, print will call console.log("Hello World!")
// This will print "Hello World!" to the console after the delay
console.log("passing console.log as callback to print function:");
print(console.log);


console.log("passing custom callback to print function:");
// Here, we call print and pass our own custom callback function
print((data)=>{
    console.log(data + " from custom callback");
});



function getSquare(num,callback){
    setTimeout(()=>{
        callback(num * num);
    })
}

console.log("Calculating square of 5:");
getSquare(5,(result)=>{
    console.log("Square is:", result);
}); 