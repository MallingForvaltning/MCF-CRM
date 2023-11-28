var submitted = false; // Flag to track if the form has been submitted

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    if (!submitted) { // Check if the form has not been submitted before
        // Forward the selected email using Office.js
        Office.context.mailbox.item.getSelectedDataAsync(Office.MailboxEnums.ItemType.Message, function (result) {
            if (result.status === Office.AsyncResultStatus.Succeeded) {
                var selectedMessage = result.value;
                
                // Create a new email message for forwarding
                var forwardingMessage = Office.context.mailbox.item.createForward();
                
                // Set the recipient email address
                forwardingMessage.to.addRecipients([{ emailAddress: { address: 'jn@malling.no' } }]);
                
                // Set the email body
                forwardingMessage.body.setAsync('ALFCRM', { coercionType: Office.CoercionType.Text }, function (bodyResult) {
                    if (bodyResult.status === Office.AsyncResultStatus.Succeeded) {
                        // Send the forwarded email
                        forwardingMessage.send(function (sendResult) {
                            if (sendResult.status === Office.AsyncResultStatus.Succeeded) {
                                // Forwarding was successful
                                console.log('Email forwarded successfully.');
                                
                                // Change the text of the Submit button to "Takk!"
                                var submitButton = document.getElementById('submitButton');
                                submitButton.textContent = 'Takk!';
                                
                                submitted = true; // Set the flag to indicate submission
                                
                                // Disable the button after submission
                                submitButton.setAttribute('disabled', 'disabled');
                                
                                // Continue with any additional form submission logic
                                // ...
                            } else {
                                // Forwarding failed
                                console.error('Error forwarding email: ' + sendResult.error.message);
                            }
                        });
                    } else {
                        // Setting email body failed
                        console.error('Error setting email body: ' + bodyResult.error.message);
                    }
                });
            } else {
                // Getting selected email data failed
                console.error('Error getting selected email data: ' + result.error.message);
            }
        });
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
