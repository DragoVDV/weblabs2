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
    const itemsData = [
        {
            name: 'Tiny House',
            description: 'A small eco-friendly house',
            price: 200,
            lastUpdate: '2024-09-15',
            image: '/images/Basecamp-IJmuiden-EcoCabins-Tiny-House-40m2-11.webp'
        },
        {
            name: 'Big House',
            description: 'A small eco-friendly house',
            price: 200,
            lastUpdate: '2024-09-15',
            image: '/images/Basecamp-IJmuiden-EcoCabins-Tiny-House-40m2-11.webp'
        },
        // ...інші елементи...
    ];

    renderItems(itemsData);

    document.getElementById("reset").addEventListener('click', reset_input);
    let dick = document.getElementById("search-button").addEventListener("input", search);
   
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

            container.appendChild(template);
        });
    }

 
    
    
    
    
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
        // Sort by price descending
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


});


