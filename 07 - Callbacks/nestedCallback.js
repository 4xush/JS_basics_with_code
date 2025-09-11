
function getSquare(num, callback) {
    // Use a static property on the function to keep delay state
    if (typeof getSquare.delay === 'undefined') {
        console.log('Initial call, setting delay to 1000ms');
        getSquare.delay = 1000;
    }
    const currentDelay = getSquare.delay;
    setTimeout(() => {
        const result = num * num;
        callback(result);
    }, currentDelay);
    getSquare.delay += 1000;
}

const val = 5;
getSquare(5, (square1) => {
    console.log(`Square of ${val} is : ${square1}`);
    getSquare(square1, (square2) => {
        console.log(`Square of ${square1} is : ${square2}`);
        getSquare(square2, (square3) => {
            console.log(`Square of ${square2} is : ${square3}`);
        });
    });
});