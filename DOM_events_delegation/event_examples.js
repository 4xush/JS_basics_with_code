// event_examples.js
// This file demonstrates various DOM event handling concepts

// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    setupExamples();
});

function setupExamples() {
    // Basic Event Handling
    // ===================
    const button = document.getElementById('basic-button');
    if (button) {
        button.addEventListener('click', function () {
            console.log('Button was clicked!');
            document.getElementById('basic-output').textContent = 'Button was clicked!';
        });
    }

    // Event Object Properties
    // ======================
    const infoButton = document.getElementById('event-info-button');
    if (infoButton) {
        infoButton.addEventListener('click', function (event) {
            // Log the event object to see all properties
            console.log('Event object:', event);

            const output = document.getElementById('event-info-output');
            output.innerHTML = `
                <strong>Event type:</strong> ${event.type}<br>
                <strong>Target element:</strong> ${event.target.tagName}<br>
                <strong>Target ID:</strong> ${event.target.id}<br>
                <strong>Coordinates:</strong> X: ${event.clientX}, Y: ${event.clientY}<br>
                <strong>Timestamp:</strong> ${event.timeStamp}ms
            `;
        });
    }

    // Event Bubbling Example
    // =====================
    const bubbleParent = document.getElementById('bubble-parent');
    const bubbleChild = document.getElementById('bubble-child');
    const bubbleOutput = document.getElementById('bubble-output');

    if (bubbleParent && bubbleChild) {
        bubbleParent.addEventListener('click', function (event) {
            console.log('Parent clicked!');
            bubbleOutput.innerHTML += '<p>Parent was clicked!</p>';
        });

        bubbleChild.addEventListener('click', function (event) {
            console.log('Child clicked!');
            bubbleOutput.innerHTML += '<p>Child was clicked!</p>';

            // Uncomment to stop propagation:
            // event.stopPropagation();
        });
    }

    // Event Capturing Example
    // =====================
    const captureParent = document.getElementById('capture-parent');
    const captureChild = document.getElementById('capture-child');
    const captureOutput = document.getElementById('capture-output');

    if (captureParent && captureChild) {
        captureParent.addEventListener('click', function (event) {
            console.log('Parent captured!');
            captureOutput.innerHTML += '<p>Parent captured the event!</p>';
        },true); // true enables capturing phase

        captureChild.addEventListener('click', function (event) {
            console.log('Child clicked in capturing example');
            captureOutput.innerHTML += '<p>Child was clicked!</p>';
            // event.stopPropagation();
        });
    }

    // Event Delegation Example
    // ======================
    const delegationList = document.getElementById('delegation-list');
    const delegationOutput = document.getElementById('delegation-output');

    if (delegationList) {
        // Single event handler for all list items
        delegationList.addEventListener('click', function (event) {
            // Check if a list item was clicked
            if (event.target.tagName === 'LI') {
                console.log('List item clicked:', event.target.textContent);
                delegationOutput.textContent = `You clicked: ${event.target.textContent}`;

                // Change background color
                const items = delegationList.querySelectorAll('li');
                items.forEach(item => item.style.backgroundColor = '');
                event.target.style.backgroundColor = '#ffeb3b';
            }
        });
    }

    // Prevent Default Example
    // =====================
    const preventDefaultLink = document.getElementById('prevent-default-link');
    const preventDefaultOutput = document.getElementById('prevent-default-output');

    if (preventDefaultLink) {
        preventDefaultLink.addEventListener('click', function (event) {
            event.preventDefault();
            console.log('Default link behavior prevented');
            preventDefaultOutput.textContent = 'Link click was intercepted!';
        });
    }

    // Custom Events Example
    // ===================
    const customEventButton = document.getElementById('custom-event-button');
    const customEventTarget = document.getElementById('custom-event-target');
    const customEventOutput = document.getElementById('custom-event-output');

    if (customEventButton && customEventTarget) {
        // Listen for our custom event
        customEventTarget.addEventListener('awesome', function (event) {
            console.log('Custom event received:', event.detail);
            customEventOutput.textContent = `Custom event received with data: ${JSON.stringify(event.detail)}`;
        });

        // Dispatch custom event when button is clicked
        customEventButton.addEventListener('click', function () {
            const customEvent = new CustomEvent('awesome', {
                bubbles: true,
                detail: { time: new Date(), message: 'This is a custom event!' }
            });

            customEventTarget.dispatchEvent(customEvent);
        });
    }
}
