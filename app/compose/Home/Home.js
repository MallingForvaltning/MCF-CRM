Office.onReady(function(info) {
    // The Office JavaScript API is ready
    if (info.host === Office.HostType.Outlook) {
        // Event listeners and functions that interact with Office APIs are safe to define here
        
        document.getElementById('registrationForm').addEventListener('submit', function(event) {
            event.preventDefault();
            
            var submitButton = document.getElementById('submitButton');
            submitButton.textContent = 'Takk!'; // Change the text of the Submit button to "Takk!"
            submitButton.disabled = true; // Disable the button after submission
            
            var confirmationMessage = document.getElementById('confirmationMessage');
            confirmationMessage.style.display = 'block'; // Show the confirmation message
            
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

        // ... any other code dependent on the Office API ...

    }
});

// This function can remain outside the Office.onReady function 
// if it's only called from within the Office.onReady scope
function forwardEmailWithCodeAndName() {
    console.log('forwardEmailWithCodeAndName called'); // Debug log
    var tenantName = document.getElementById('nameInput').value;
    console.log('Tenant Name:', tenantName); // Debug log

    var item = Office.context.mailbox.item;
    item.body.getAsync('html', function(result) {
        if (result.status === Office.AsyncResultStatus.Succeeded) {
            var originalBody = result.value;
            var newBody = `ALFCRM<br>Tenant Name: ${tenantName}<br><br>` + originalBody;

            var forwardMessage = item.forward();
            forwardMessage.to.setAsync(['jn@malling.no'], function(asyncResult) {
                if (asyncResult.status === Office.AsyncResultStatus.Succeeded) {
                    console.log('Recipient set successfully'); // Debug log
                    forwardMessage.body.setAsync(newBody, { coercionType: 'html' }, function(result) {
                        if (result.status === Office.AsyncResultStatus.Succeeded) {
                            forwardMessage.sendAsync(function(result) {
                                if (result.status === Office.AsyncResultStatus.Succeeded) {
                                    console.log('Email forwarded successfully.');
                                } else {
                                    console.error('Error while sending email:', result.error.message);
                                }
                            });
                        } else {
                            console.error('Error while setting email body:', result.error.message);
                        }
                    });
                } else {
                    console.error('Error while setting recipient:', asyncResult.error.message);
                }
            });
        } else {
            console.error('Error while getting email body:', result.error.message);
        }
    });
}
