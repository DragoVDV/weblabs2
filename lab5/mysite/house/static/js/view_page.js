// document.addEventListener('DOMContentLoaded', () => {
    
//     fetch('/modellen', {
//         headers: {
//             'Accept': 'application/json'  
//         }
//     })
//         .then(response => response.json()) 
//         .then(data => {
//             console.log(data);
//             itemsData = data;  
//             renderItems(itemsData);  
//             total_count(itemsData);  
//         })
//         .catch(error => console.error('Error fetching data:', error));

//     // Global variable to hold items data
//     let itemsData = [];

//     // Render the items in the template
//     function renderItems(filteredItems) {
//         const container = document.getElementById('items-container');
//         container.innerHTML = '';  // Clear container before rendering

//         filteredItems.forEach(item => {
//             const template = document.getElementById('item').content.cloneNode(true);
        
//             template.querySelector('.item-name').textContent = item.name;
//             template.querySelector('.item-description').textContent = item.description;
//             template.querySelector('#price').textContent = item.price;
        
//             // Перевірка на валідність дати
//             const formattedDate = formatDate(item.updated);
//             template.querySelector('#item-lastupdate').textContent = formattedDate;
//             template.querySelector('.image').src = item.image_url;
        
//             const editButton = template.querySelector('.edit-button');
//             editButton.setAttribute('data-id', item.id);  // Додаємо ID в атрибут
//             editButton.addEventListener('click', (event) => {
//                 event.preventDefault(); 
                
//                 console.log(item.id);
//                 window.location.href = `/item_edit/${item.id}/`;  // Перехід на сторінку редагування
//             });
//             const removeButton = template.querySelector('.remove-button');
//             removeButton.setAttribute('data-id', item.id);
//             removeButton.addEventListener('click', function(event) {
//                 const houseId = event.target.getAttribute('data-id');
                
//                 // Запит на видалення елемента через API
//                 fetch(`/houses/${houseId}/delete/`, {
//                     method: 'DELETE',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'X-CSRFToken': getCSRFToken()  // Додайте CSRF токен, якщо потрібно
//                     },
//                 })
//                 .then(response => {
//                     if (response.ok) {
//                         // Видаляємо елемент з масиву
//                         const index = itemsData.findIndex(i => i.id == houseId);
//                         if (index !== -1) {
//                             itemsData.splice(index, 1);  // Видаляємо елемент з масиву
//                             renderItems(itemsData);  // Оновлюємо DOM
//                             total_count(itemsData);  // Оновлюємо загальну вартість
//                         }
//                     } else {
//                         alert('Не вдалося видалити елемент. Спробуйте ще раз.');
//                     }
//                 })
//                 .catch(error => console.error('Помилка при видаленні:', error));
//             });
           
//             // Append the filled template to the container
//             container.appendChild(template);
//         });
        
//         total_count(filteredItems);  // Оновлюємо загальну вартість при рендерингу
//     }
//     function formatDate(isoDate) {
//         const date = new Date(isoDate);  // Перетворення строки у дату

//         const year = date.getFullYear();
//         const month = String(date.getMonth() + 1).padStart(2, '0');  // Місяці починаються з 0, тому додаємо 1
//         const day = String(date.getDate()).padStart(2, '0');  // Додаємо нуль для днів менше 10

//         return `${year}-${month}-${day}`;
//     }

//     const input_result = document.querySelector(".input_class");
//     input_result.addEventListener("input", search);
//     document.getElementById("sort").addEventListener('change', sortItems);
//     document.getElementById("reset_button").addEventListener('click', reset_input);

//     function sortItems() {
//         const isChecked = document.getElementById("sort").checked;
//         let sortedItems = [...itemsData]; // Create a copy of the original data

//         if (isChecked) {
//             sortedItems.sort((a, b) => b.price - a.price);
//         } else {
//             sortedItems.sort((a, b) => a.price - b.price);  // Sort ascending if unchecked
//         }
       
//         renderItems(sortedItems);
//     }

//     function reset_input() {
//         document.getElementById("search_form").reset();
//         renderItems(itemsData);  // Render all items again
//     }

//     let filteredItems = [...itemsData];  // Спочатку показуємо всі елементи

//     function search(e) {
//         let data_input = e.target.value.trim().toLowerCase();
    
//         // Фільтруємо елементи за введеними даними
//         filteredItems = itemsData.filter(item =>
//             item.name.toLowerCase().includes(data_input) ||
//             item.description.toLowerCase().includes(data_input)
//         );
    
//         console.log(filteredItems); 
//         renderItems(filteredItems);  
//     }
    
//     document.getElementById("count").addEventListener('click', (event) => {
//         event.preventDefault();
//         console.log(filteredItems);  // Лог для перевірки
//         total_count(filteredItems.length > 0 ? filteredItems : itemsData); 
//     });
    
//     function total_count(items) {
//         let totalPrice = items.reduce((sum, item) => sum + item.price, 0);  // Підраховуємо загальну вартість
//         document.getElementById("total-price").textContent = `Total price: ${totalPrice.toFixed(2)}`;  // Виводимо загальну вартість з двома десятковими знаками
//     }
    
//     document.getElementById("form_create").addEventListener("submit", addHouseList);

//     function showErrorModal(errorMessage) {
//         const modal = document.getElementById("errorModal");
//         const errorText = document.getElementById("errorMessage");
//         const closeModalBtn = document.querySelector(".close");

//         errorText.textContent = errorMessage;
//         modal.style.display = "block";

//         closeModalBtn.onclick = function() {
//             modal.style.display = "none";
//         };

//         window.onclick = function(event) {
//             if (event.target === modal) {
//                 modal.style.display = "none";
//             }
//         };
//     }

//     function addHouseList(event) {
//         event.preventDefault();

//         // Collect form data
//         const title = document.getElementById("title").value.trim();
//         const description = document.getElementById("description").value.trim();
//         const cost = document.getElementById("cost").value.trim();
//         const image = document.getElementById("image_upload").files[0];

//         const duplicate = itemsData.find(item => item.name.toLowerCase() === title.toLowerCase());

//         let errorMessage = "";

//         if (!title) {
//             errorMessage = "The 'Title' field cannot be empty.";
//         } else if (!description) {
//             errorMessage = "The 'Description' field cannot be empty.";
//         } else if (duplicate) {
//             errorMessage = "Don't create duplicates.";
//         } else if (!cost || isNaN(cost) || Number(cost) <= 0) {
//             errorMessage = "The 'Cost' field must contain a positive number.";
//         } else if (!image) {
//             errorMessage = "You must upload an image.";
//         }

//         if (errorMessage) {
//             showErrorModal(errorMessage);
//             return;
//         }

//         // Prepare new item data
//         const newItem = {
//             name: title,
//             description: description,
//             price: parseFloat(cost),
//             last_update: new Date().toISOString(),
//             image_url: URL.createObjectURL(image)  // Use a temporary URL for the image
//         };

//         itemsData.push(newItem);  // Add new item to the array
//         renderItems(itemsData);  // Re-render the items
//         document.getElementById("form_create").reset();  // Reset form fields
//         total_count(itemsData);  // Оновлюємо загальну вартість після додавання нового елемента
//     }

//     function getCSRFToken() {
//         let cookieValue = null;
//         if (document.cookie && document.cookie !== '') {
//             const cookies = document.cookie.split(';');
//             for (let i = 0; i < cookies.length; i++) {
//                 const cookie = cookies[i].trim();
//                 if (cookie.substring(0, 10) === 'csrftoken=') {
//                     cookieValue = decodeURIComponent(cookie.substring(10));
//                     break;
//                 }
//             }
//         }
//         return cookieValue;
//     }
// });

document.addEventListener("DOMContentLoaded", function() {
    const checkbox = document.getElementById('sort-checkbox');
    const countButton = document.getElementById('count-button');
    const totalPriceSpan = document.getElementById('total-price'); // Поле для відображення загальної ціни
    const searchInput = document.getElementById('input-search'); // Поле вводу для пошуку
    const searchButton = document.getElementById('search-button'); // Кнопка пошуку
    const resetButton = document.getElementById('reset_button'); // Кнопка очищення

    // Функція для завантаження елементів із сортуванням і пошуком
    function fetchItems(sortOrder = 'asc', searchQuery = '') {
        fetch(`/modellen?sort=${sortOrder}&q=${searchQuery}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("items-container");
            container.innerHTML = "";  // Очищаємо контейнер перед додаванням нових елементів

            data.items.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('item');

                itemDiv.innerHTML = `
                    <img src="${item.image_url}" alt="${item.name}" class="image">
                    <div class="item-info">
                        <h1 class="item-name">${item.name}</h1>
                        <p class="item-description">${item.description}</p>
                        <p><span class="price">${item.price}</span>$</p>
                        <p class="item-lastupdate">
                            <span>${new Date(item.updated).toLocaleString()}</span>
                        </p>
                        <div class="item-buttons">
                            <label class="item-buttons-detail">
                                <a href="/item_edit/${item.id}/" class="edit-button" data-pk="${item.id}">Edit</a>
                            </label>
                            <label class="item-buttons-detail">
                                <button class="remove-button" data-id="${item.id}">Remove</button>
                            </label>
                        </div>
                    </div>
                `;

                // Логіка видалення елементів
                const deleteButton = itemDiv.querySelector('.remove-button');
                deleteButton.addEventListener('click', function(event) {
                    event.preventDefault();  // Запобігаємо стандартній дії

                    const itemId = deleteButton.getAttribute('data-id');

                    // Підтвердження видалення
                    if (confirm('Are you sure you want to delete this house?')) {
                        fetch(`/delete/${itemId}/`, {
                            method: 'DELETE',
                            headers: {
                                'X-CSRFToken': getCsrfToken(),  // CSRF токен для безпеки
                            }
                        })
                        .then(response => {
                            if (response.ok) {
                                alert('House deleted successfully.');
                                itemDiv.remove();  // Видаляємо елемент з DOM
                            } else {
                                alert('Error deleting house: ' + response.statusText);
                            }
                        })
                        .catch(error => {
                            console.error('Error:', error);
                            alert('An error occurred: ' + error.message);
                        });
                    }
                });

                container.appendChild(itemDiv);
            });
        })
        .catch(error => {
            console.error("Error fetching items:", error);
        });
    }

    // Функція для обчислення загальної ціни
    function calculateTotalPrice(sortOrder = 'asc', searchQuery = '') {
        fetch(`/modellen?sort=${sortOrder}&q=${searchQuery}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            totalPriceSpan.textContent = `${data.total_price}$`; // Оновлюємо загальну ціну
        })
        .catch(error => {
            console.error("Error fetching total price:", error);
        });
    }

    // Початкове завантаження за замовчуванням (по зростанню)
    fetchItems('asc');

    // Додаємо обробник зміни стану чекбокса для зміни порядку сортування
    checkbox.addEventListener('change', function() {
        const sortOrder = this.checked ? 'desc' : 'asc';  // Якщо чекбокс відмічений, сортувати за спаданням
        const searchQuery = searchInput.value; // Отримуємо текст пошуку
        fetchItems(sortOrder, searchQuery);  // Оновлюємо елементи на основі нового порядку
    });

    // Додаємо обробник натискання кнопки "Search"
    searchButton.addEventListener('click', function(event) {
        event.preventDefault(); // Запобігаємо стандартній дії кнопки
        const currentSortOrder = checkbox.checked ? 'desc' : 'asc'; // Отримуємо поточний порядок сортування
        const searchQuery = searchInput.value; // Отримуємо текст пошуку
        fetchItems(currentSortOrder, searchQuery); // Оновлюємо елементи на основі нового пошуку
    });

    // Додаємо обробник натискання кнопки "Count"
    countButton.addEventListener('click', function() {
        const currentSortOrder = checkbox.checked ? 'desc' : 'asc'; // Отримуємо поточний порядок сортування
        const searchQuery = searchInput.value; // Отримуємо текст пошуку
        calculateTotalPrice(currentSortOrder, searchQuery); // Викликаємо функцію для обчислення загальної ціни
    });

    // Додаємо обробник натискання кнопки "Clear"
    resetButton.addEventListener('click', function() {
        searchInput.value = ''; // Очищаємо поле вводу
        const currentSortOrder = checkbox.checked ? 'desc' : 'asc'; // Отримуємо поточний порядок сортування
        fetchItems(currentSortOrder, ''); // Оновлюємо елементи без фільтру
        totalPriceSpan.textContent = ''; // Очищаємо загальну ціну
    });
});

// Функція для отримання CSRF-токена
function getCsrfToken() {
    return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
}
