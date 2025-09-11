function getData() {
  let data = "My Secret Data!";
  return new Promise((resolve,reject)=>{
    console.log("Data is processing...");
    setTimeout(()=>{
      resolve(data);
    },1000);
  });
}

// Usage
const receivedData = getData();
console.log("Fetching data..." , receivedData);

setTimeout(()=>{
  callback(receivedData);
},2050);

function callback (data){
  console.log("Got:", data); // Got: Data received!
}

console.log(await getData()); // Got: Data received!