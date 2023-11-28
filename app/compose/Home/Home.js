document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var submitButton = document.getElementById('submitButton');
    
    // Change the text of the Submit button to "Takk!"
    submitButton.textContent = 'Takk!';
    
    // Disable the button after submission
    submitButton.disabled = true;
    
    // Show the confirmation message
    var confirmationMessage = document.getElementById('confirmationMessage');
    confirmationMessage.style.display = 'block';
    
    // Implement any remaining form submission logic here
    // ...
});

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
