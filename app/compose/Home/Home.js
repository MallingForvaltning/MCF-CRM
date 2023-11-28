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
    
    // Call the function to forward the email with the code and tenant's name
    forwardEmailWithCodeAndName();

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

// This function forwards the current email to jn@malling.no with a specific code and tenant's name.
function forwardEmailWithCodeAndName() {
    // Retrieve the input value from the 'nameInput' field
    var tenantName = document.getElementById('nameInput').value;

    // Use Office JavaScript API to get the current item
    var item = Office.context.mailbox.item;

    // Create a forward message
    item.body.getAsync('html', function(result) {
        if (result.status === Office.AsyncResultStatus.Succeeded) {
            var originalBody = result.value; // Get the current body of the email
            var newBody = `ALFCRM<br>Tenant Name: ${tenantName}<br><br>` + originalBody; // Append the code and tenant's name

            // Create a forward message
            var forwardMessage = item.forward();
            forwardMessage.to.setAsync(['jn@malling.no']); // Set the recipient
            forwardMessage.body.setAsync(newBody, { coercionType: 'html' }, function(result) {
                if (result.status === Office.AsyncResultStatus.Succeeded) {
                    // Send the forward message
                    forwardMessage.sendAsync(function(result) {
                        if (result.status === Office.AsyncResultStatus.Succeeded) {
                            console.log('Email forwarded successfully.');
                        } else {
                            console.log('Error while sending email: ' + result.error.message);
                        }
                    });
                } else {
                    console.log('Error while setting email body: ' + result.error.message);
                }
            });
        } else {
            console.log('Error while getting email body: ' + result.error.message);
        }
    });
}
