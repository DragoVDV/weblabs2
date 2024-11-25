document.getElementById('form_create').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the form from submitting

    
    const newItem = {
        name: document.getElementById('title').value,  // Correctly access the value
        description: document.getElementById('description').value,
        price: parseFloat(document.getElementById('cost').value),

        image: document.getElementById('image_upload').value,
    };
    console.log(newItem)
    // Store the new item in localStorage
    let itemsData = JSON.parse(localStorage.getItem('itemsData')) || [];
    itemsData.push(newItem);
    // localStorage.setItem('itemsData', JSON.stringify(itemsData));

    // Redirect back to the main page
    // window.location.href = 'view_page.html'; // Change to your main page URL
});
