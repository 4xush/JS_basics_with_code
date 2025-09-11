// worker.js - Node.js Worker Threads Example
const { parentPort } = require('worker_threads');

parentPort.on('message', (data) => {
    if (data.type === 'start') {
        // Simulate heavy computation
        const result = heavyComputation(data.data);
        parentPort.postMessage({ type: 'result', data: result });
    }
});

function heavyComputation(data) {
    // Simulate CPU-intensive task
    let result = 0;
    for (let i = 0; i < 1000000000; i++) {
        result += Math.sqrt(i);
    }
    return {
        input: data,
        result: result
    };
}orker Example
self.onmessage = function (e) {
    if (e.data.type === 'start') {
        // Simulate heavy computation
        const result = heavyComputation(e.data.data);
        self.postMessage({ type: 'result', data: result });
    }
};

function heavyComputation(data) {
    // Simulate CPU-intensive task
    let result = 0;
    for (let i = 0; i < 1000000000; i++) {
        result += Math.sqrt(i);
    }
    return {
        input: data,
        result: result
    };
}
