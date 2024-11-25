// document.getElementById('editForm').addEventListener('submit', function(e) {
//     e.preventDefault(); // Prevent the default form submission
//     var form = e.target;

//     var formData = new FormData(form);

//     fetch(form.action, {
//         method: 'PUT',
//         body: formData,
//         headers: {
//             'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
//         }
//     }).then(response => {
//         const errorMessageDiv = document.getElementById('error-message');
//         errorMessageDiv.innerHTML = ''; // Clear previous error messages

//         if (response.ok) {
//             window.location.href = '/modellen'; // Redirect on success
//         } else {
//             // Handle validation errors returned from the serializer
//             response.json().then(data => {
//                 console.error('Failed to update:', data);

//                 // Check if there are any errors and display them
//                 if (data) {
//                     for (const [field, errors] of Object.entries(data)) {
//                         if (Array.isArray(errors)) {
//                             errors.forEach(error => {
//                                 const errorMsg = document.createElement('div');
//                                 errorMsg.textContent = `${field}: ${error}`; // Create a new div for each error
//                                 errorMessageDiv.appendChild(errorMsg); // Append to the error message div
//                             });
//                         } else {
                            
//                             const errorMsg = document.createElement('div');
//                             errorMsg.textContent = `${field}: ${errors}`;
//                             errorMessageDiv.appendChild(errorMsg);
//                         }
//                     }
//                 }
//             });
//         }
//     }).catch(error => {
//         console.error('Error:', error);
//         document.getElementById('error-message').innerHTML = 'An unexpected error occurred. Please try again later.';
//     });
// });


document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const pk = document.getElementById('pk').value
    
    form.addEventListener("submit", function(event) {
        event.preventDefault();  // Stop the form from submitting the traditional way
        
        const formData = new FormData(form);
        console.log(form);

        fetch(`/item_edit/${pk}/`, {
            method: 'PUT',  // Using PUT method
            body: formData,  // Send the form data
            headers: {
                'X-CSRFToken': form.querySelector('[name=csrfmiddlewaretoken]').value,  // CSRF token
            }
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.error || 'Error updating item.');
                });
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                 // Success message
                window.location.href = "/modellen"; 
                alert('Дані успішно оновлені.'); // Redirect to another page
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred: ' + error.message);
        });
    });
});
