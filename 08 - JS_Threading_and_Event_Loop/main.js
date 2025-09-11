// main.js - Node.js Worker Threads Example
const { Worker } = require('worker_threads');
const path = require('path');

// Create worker with absolute path
const worker = new Worker(path.join(__dirname, 'worker.js'));

console.log('Main: Starting worker');
worker.postMessage({ type: 'start', data: [1, 2, 3, 4, 5] });

worker.on('message', (data) => {
    console.log('Main: Received from worker:', data);
});

worker.on('error', (error) => {
    console.error('Worker error:', error);
});

worker.on('exit', (code) => {
    if (code !== 0) {
        console.error(`Worker stopped with exit code ${code}`);
    }
});

// Keep main thread responsive
let counter = 0;
setInterval(() => {
    console.log('Main thread counter:', counter++);
}, 1000);
