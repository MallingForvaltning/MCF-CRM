var submitted = false; // Flag to track if the form has been submitted

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    if (!submitted) { // Check if the form has not been submitted before
        // Change the text of the Submit button to "Takk!"
        var submitButton = document.getElementById('submitButton');
        submitButton.textContent = 'Takk!';
        
        submitted = true; // Set the flag to indicate submission
        
        // Disable the button after submission
        submitButton.setAttribute('disabled', 'disabled');
        
        // Show the confirmation message
        var confirmationMessage = document.getElementById('confirmationMessage');
        confirmationMessage.style.display = 'block';
        
        // Implement any remaining form submission logic here
        // ...
    }
});

// Change event listener for radio buttons to toggle the placeholder text
document.querySelectorAll('input[type="radio"][name="role"]').forEach(radio => {
    radio.addEventListener('change', function(event) {
        var nameInput = document.getElementById('nameInput');
        var ownerNotice = document.getElementById('ownerNotice');
        if (event.target.value === 'leietaker') {
            nameInput.placeholder = "Navn på leietaker..";
            ownerNotice.style.display = 'none';
        } else if (event.target.value === 'eiendomseier') {
            nameInput.placeholder = "Navn på eiendom...";
            ownerNotice.style.display = 'block';
        }
    });
});
