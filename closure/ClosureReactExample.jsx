// Example 1: WITHOUT Closure (Less Ideal Way)
function CounterWithoutClosure() {
    const [counters, setCounters] = useState({
        counter1: 0,
        counter2: 0
    });

    // Notice we need to pass the counterName each time
    const incrementCounter = (counterName) => {
        setCounters(prev => ({
            ...prev,
            [counterName]: prev[counterName] + 1
        }));
    };

    return (
        <div>
            <div>
                Counter 1: {counters.counter1}
                {/* We must remember to pass 'counter1' every time */}
                <button onClick={() => incrementCounter('counter1')}>+</button>
            </div>
            <div>
                Counter 2: {counters.counter2}
                {/* We must remember to pass 'counter2' every time */}
                <button onClick={() => incrementCounter('counter2')}>+</button>
            </div>
        </div>
    );
}

// Example 2: WITH Closure (Better Way)
function CounterWithClosure() {
    const [counters, setCounters] = useState({
        counter1: 0,
        counter2: 0
    });

    // This function creates a closure
    const createIncrementHandler = (counterName) => {
        // This inner function "remembers" which counter it's for
        // even after createIncrementHandler has finished executing
        return () => {
            setCounters(prev => ({
                ...prev,
                [counterName]: prev[counterName] + 1
            }));
        };
    };

    // Create handlers once - they remember their counter
    const incrementCounter1 = createIncrementHandler('counter1');
    const incrementCounter2 = createIncrementHandler('counter2');

    return (
        <div>
            <div>
                Counter 1: {counters.counter1}
                {/* No need to specify counter name here */}
                <button onClick={incrementCounter1}>+</button>
            </div>
            <div>
                Counter 2: {counters.counter2}
                {/* No need to specify counter name here */}
                <button onClick={incrementCounter2}>+</button>
            </div>
        </div>
    );
}

/*
The key benefit of closure in React is that it lets you:

Create function handlers that "remember" their specific data
Avoid passing data explicitly in event handlers
Reduce the chance of errors from passing wrong parameters
Make your code more maintainable and self-contained
Think of closure like creating a "specialized" function that remembers
some specific information. Once you create it, it always knows
what it's supposed to work with, without you having to tell it again and again.

*/