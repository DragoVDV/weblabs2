document.addEventListener('DOMContentLoaded', () => {
   
    const itemsData = [
        {
            name: 'Tiny House',
            description: 'A small eco-friendly house',
            price: 140,
            lastUpdate: '2024-09-15',
            image: '/images/Basecamp-IJmuiden-EcoCabins-Tiny-House-40m2-11.webp'
        },
        {
            name: 'Big House2',
            description: 'A small eco-friendly house',
            price: 190,
            lastUpdate: '2024-09-15',
            image: '/images/Basecamp-IJmuiden-EcoCabins-Tiny-House-40m2-11.webp'
        },
        {
        name: 'Very Big house',
        description: 'A small eco-friendly house',
        price: 200,
        lastUpdate: '2024-09-15',
        image: '/images/Basecamp-IJmuiden-EcoCabins-Tiny-House-40m2-11.webp'},
        {
            name: 'Big House',
            description: 'A small eco-friendly house',
            price: 200,
            lastUpdate: '2024-09-15',
            image: '/images/Basecamp-IJmuiden-EcoCabins-Tiny-House-40m2-11.webp'},
            {
                name: 'Big House so big',
                description: 'A small eco-friendly house',
                price: 200,
                lastUpdate: '2024-09-15',
                image: '/images/Basecamp-IJmuiden-EcoCabins-Tiny-House-40m2-11.webp'},
    ];

    
    renderItems(itemsData);

    function renderItems(filteredItems) {
        const container = document.getElementById('items-container');
        container.innerHTML = ''; // Очищуємо контейнер перед рендерингом

        filteredItems.forEach(item => {
            const template = document.getElementById('item').content.cloneNode(true);

            template.querySelector('.item-name').textContent = item.name;
            template.querySelector('.item-description').textContent = item.description;
            template.querySelector('#price').textContent = item.price;
            template.querySelector('#item-lastupdate').textContent = item.lastUpdate;
            template.querySelector('img').src = item.image;
document.addEventListener('DOMContentLoaded', () => {
  

    renderItems(itemsData);

    document.getElementById("reset").addEventListener('click', reset_input);
   
   
    

 
    
    
    
    
    function reset_input() {
        document.getElementById("search_form").reset(); // Скидає форму
        renderItems(itemsData); // Відображаємо всі елементи
    }
});

            container.appendChild(template);
        });
    }
    
 
    const input_result = document.querySelector(".input_class");
    input_result.addEventListener("input", search);

    let filteredItems = itemsData;
 
    function search(e) {
        let data_input = e.target.value.trim().toLowerCase();
              
        
            if (data_input !== '') {
                
                // Фільтруємо елементи за назвою або описом
                filteredItems = itemsData.filter(item => 
                    item.name.toLowerCase().includes(data_input) || 
                    item.description.toLowerCase().includes(data_input)
                );  
                renderItems(filteredItems); 
                total_count(filteredItems);
            } else {
                
                filteredItems = itemsData;
                renderItems(itemsData); 
            }
           
            return 
       
    }

document.getElementById("sort").addEventListener('change', sortItems);
document.getElementById("reset_button").addEventListener('click', reset_input)
    
function reset_input() {
    filteredItems = itemsData
    let value = document.getElementById("search_form")
    value.reset()
    renderItems(itemsData);
    
 }
   
 
 function sortItems() {
    const isChecked = document.getElementById("sort").checked;
    const sortedItems = [...filteredItems]; // Create a copy of the original data
    
    if (isChecked) {
        
        sortedItems.sort((a, b) => b.price - a.price);
    }
    
    renderItems(sortedItems);
}
    

document.getElementById("count").addEventListener('click', (event) => {
    event.preventDefault();
    total_count(filteredItems);
});

function total_count(filteredItems) {
    let totalPrice = 0;

    filteredItems.forEach(item => {
        totalPrice += item.price;
    });

    document.getElementById("total-price").textContent = `Total price: ${totalPrice}`;
}

document.getElementById("form_create").addEventListener("submit", addHouseList)



function showErrorModal(errorMessage) {
    const modal = document.getElementById("errorModal");
    const errorText = document.getElementById("errorMessage");
    const closeModalBtn = document.querySelector(".close");

    
    
    errorText.textContent = errorMessage;

  
    modal.style.display = "block";

  
    closeModalBtn.onclick = function() {
        modal.style.display = "none";
    };

 
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}

function addHouseList(form) {
    event.preventDefault();

    // Collect form data
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const cost = document.getElementById("cost").value.trim();
    const image = document.getElementById("image_upload").files[0];
    
    
    const duplicate = itemsData.find(item => item.name.toLowerCase() === title.toLowerCase());

    let errorMessage = "";

   
    if (!title) {
        errorMessage = "The 'Title' field cannot be empty.";
    } else if (!description) {
        errorMessage = "The 'Description' field cannot be empty.";
    } 
    else if(duplicate){
        errorMessage = "Don`t do dublicate"
    }
    else if (!cost || isNaN(cost) || Number(cost) <= 0) {
        errorMessage = "The 'Cost' field must contain a positive number.";
    } else if (!image) {
        errorMessage = "You must upload an image.";
    }

   
    if (errorMessage) {
        showErrorModal(errorMessage);
        return;
    }

   
    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Cost:", cost);
    console.log("Image:", image ? image.name : "No file selected");

    
    itemsData.push({
        name: title,
        description: description,
        price: parseFloat(cost),
        lastUpdate: new Date().toISOString().split('T')[0], 
        image: image ? URL.createObjectURL(image) : 'No image'  
    });

    document.getElementById("form_create").reset()
    console.log(itemsData);
    renderItems(itemsData);
}





});


