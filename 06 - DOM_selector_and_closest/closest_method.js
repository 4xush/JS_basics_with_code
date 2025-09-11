// closest() Method in JavaScript
// The closest() method traverses up through the DOM tree from the current element
// and returns the nearest ancestor that matches the selector

document.addEventListener('DOMContentLoaded', () => {
    // Example 1: Basic Usage
    // When clicking on a nested element, find its closest container
    document.body.addEventListener('click', (e) => {
        const clickedElement = e.target;
        console.log('Clicked element:', clickedElement);
        const closestSection = clickedElement.closest('.section');

        if (closestSection) {
            console.log('Found closest section:', closestSection);
            closestSection.style.backgroundColor = '#f0f0f0';
            // Reset background color after 1 second
            setTimeout(() => {
                closestSection.style.backgroundColor = '';
            }, 1000);
        }
    });

    // Example 2: Practical Use Case - Delegation with closest()
    const container = document.querySelector('.card-container');
    if (container) {
        container.addEventListener('click', (e) => {
            // Find if clicked element is a button or inside a button
            const button = e.target.closest('.card-button');

            if (button) {
                // Find the parent card of this button
                const card = button.closest('.card');

                if (card) {
                    const cardId = card.dataset.cardId;
                    console.log(`Action triggered for card ${cardId}`);
                    // Add visual feedback
                    card.style.backgroundColor = '#e8f4ff';
                    setTimeout(() => {
                        card.style.backgroundColor = '';
                    }, 1000);
                }
            }
        });
    }    // Example 3: Form Validation Context
    const inputs = document.querySelectorAll('.form-group input');
    inputs.forEach(input => {
        input.addEventListener('blur', (e) => {
            const formGroup = e.target.closest('.form-group');
            if (!e.target.value) {
                formGroup.classList.add('has-error');
                const errorDisplay = formGroup.querySelector('.error-message');
                if (errorDisplay) {
                    errorDisplay.textContent = 'This field is required';
                }
            } else {
                formGroup.classList.remove('has-error');
                const errorDisplay = formGroup.querySelector('.error-message');
                if (errorDisplay) {
                    errorDisplay.textContent = '';
                }
            }
        });
    });

    // Example 4: Menu Navigation
    const menuContainer = document.querySelector('.main-menu');
    if (menuContainer) {
        menuContainer.addEventListener('click', (e) => {
            const menuItem = e.target.closest('.menu-item');
            if (menuItem) {
                // Find the closest submenu to this menu item
                const submenu = menuItem.closest('.submenu');
                if (submenu) {
                    const mainMenu = submenu.closest('.main-menu');
                    console.log('Navigation hierarchy:', {
                        mainMenu: mainMenu.dataset.menuName,
                        submenu: submenu.dataset.submenuName,
                        item: menuItem.textContent
                    });
                    // Add visual feedback
                    menuItem.style.backgroundColor = '#e8f4ff';
                    setTimeout(() => {
                        menuItem.style.backgroundColor = '';
                    }, 1000);
                }
            }
        });
    }

    // Example 5: Table Row Operations
    const table = document.querySelector('#dataTable');
    if (table) {
        table.addEventListener('click', (e) => {
            const actionButton = e.target.closest('.action-button');
            if (actionButton) {
                // Find the closest table row (tr) to this button
                const row = actionButton.closest('tr');
                if (row) {
                    const rowId = row.dataset.rowId;
                    const table = row.closest('table');
                    console.log(`Action performed on row ${rowId} in table ${table.id}`);
                    // Add visual feedback
                    row.style.backgroundColor = '#e8f4ff';
                    setTimeout(() => {
                        row.style.backgroundColor = '';
                    }, 1000);
                }
            }
        });
    }
});
