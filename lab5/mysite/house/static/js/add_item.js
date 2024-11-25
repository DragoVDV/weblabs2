document.getElementById('form_create').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the form from submitting normally

    const formData = new FormData(this); // Create FormData from the form
    fetch('/create/', {  // Ensure this URL matches your Django URL pattern
        method: 'POST',
        body: formData,
        headers: {
            'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value // Include CSRF token
        }
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errData => {
                throw new Error('Network response was not ok: ' + JSON.stringify(errData.errors));
            });
        }
        return response.json(); // Parse the JSON response
    })
    .then(data => {
        if (data.success) {
            alert(data.message); // Show success message
            window.location.href = "/modellen"; // Redirect after success
        } else {
            // Handle errors
            let errorMessage = '';
            for (const [field, messages] of Object.entries(data.errors)) {
                errorMessage += `${field.charAt(0).toUpperCase() + field.slice(1)}: ${messages.join(', ')}\n`;
            }
            alert(errorMessage); // Show error messages
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred: ' + error.message);
    });
});

