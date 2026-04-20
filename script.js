// Рабочий код со стрелочными функциями
document.addEventListener('DOMContentLoaded', () => {
    console.log('Скрипт загружен!');
    
    // Массив для избранного
    let favorites = [];
    
    // СОЗДАЕМ БЛОК ИЗБРАННОГО (обычная функция - оставим, т.к. это объявление)
    function createFavoritesBlock() {
        const main = document.querySelector('main');
        if (!main) return;
        
        if (document.getElementById('favorites-block')) return;
        
        const block = document.createElement('div');
        block.id = 'favorites-block';
        block.innerHTML = 
            '<h2>Избранные авто</h2>' +
            '<div id="favorites-list">Список пуст</div>' +
            '<div>' +
            '   <p>Выбрано: <span id="favorites-count">0</span> авто</p>' +
            '   <button id="compare-btn">Сравнить</button>' +
            '   <button id="clear-favs">Очистить</button>' +
            '</div>';
        
        main.appendChild(block);
        
        // Кнопки блока со стрелочными функциями
        document.getElementById('compare-btn').onclick = () => {
            if (favorites.length === 0) {
                alert('Нет авто для сравнения');
            } else if (favorites.length === 1) {
                alert('Добавьте еще одно авто');
            } else {
                let text = 'СРАВНЕНИЕ:\n\n';
                favorites.forEach(car => {      
                    text += car.name + '\n';
                    text += 'Цена: ' + car.price + ' ₽\n';
                    text += 'Год: ' + car.year + '\n\n';
                });
                alert(text);
            }
        };
        
        document.getElementById('clear-favs').onclick = () => {
            if (favorites.length === 0) {
                alert('Список пуст');
                return;
            }
            
            // Возвращаем кнопки
            favorites.forEach(car => {          
                const btn = document.querySelector('.add-to-favorites[data-id="' + car.id + '"]');
                if (btn) {
                    btn.textContent = '★ В избранное';
                    btn.disabled = false;
                }
            });
            
            favorites = [];
            updateList();
            alert('Список очищен');
        };
    }
    
    // ОБНОВЛЕНИЕ СПИСКА
    function updateList() {
        const listDiv = document.getElementById('favorites-list');
        const countSpan = document.getElementById('favorites-count');
        if (!listDiv || !countSpan) return;
        
        countSpan.textContent = favorites.length;
        
        if (favorites.length === 0) {
            listDiv.innerHTML = 'Список пуст';
            return;
        }
        
        let html = '<ul>';
        favorites.forEach(car => {              
            html += '<li>' +
                car.name + ' - ' + car.price + ' ₽ ' +
                '<button class="remove-fav" data-id="' + car.id + '">✕</button>' +
                '</li>';
        });
        html += '</ul>';
        listDiv.innerHTML = html;
        
        // Кнопки удаления со стрелочными функциями
        const removeButtons = document.querySelectorAll('.remove-fav');
        removeButtons.forEach(btn => {         
            btn.onclick = (e) => {              
                const id = e.target.getAttribute('data-id');
                
                favorites = favorites.filter(car => car.id !== id);
                
                const productBtn = document.querySelector('.add-to-favorites[data-id="' + id + '"]');
                if (productBtn) {
                    productBtn.textContent = '★ В избранное';
                    productBtn.disabled = false;
                }
                
                updateList();
            };
        });
    }
    
    // ДОБАВЛЕНИЕ В ИЗБРАННОЕ
    function setupFavButtons() {
        const buttons = document.querySelectorAll('.add-to-favorites');
        console.log('Найдено кнопок: ' + buttons.length);
        
        buttons.forEach(btn => {                
            btn.onclick = (e) => {               
                const product = e.target.closest('.product');
                
                if (!product) {
                    alert('Ошибка: товар не найден');
                    return;
                }
                
                // Собираем данные
                const id = product.getAttribute('data-id');
                const name = product.querySelector('h3').textContent;
                const price = product.getAttribute('data-price');
                const year = product.getAttribute('data-year');
                const imgSrc = product.querySelector('img').src;
                
                // Проверяем, есть ли уже (через some со стрелочной функцией)
                const exists = favorites.some(car => car.id === id);
                
                if (exists) {
                    alert('Уже в избранном');
                    return;
                }
                
                // Добавляем
                favorites.push({
                    id: id,
                    name: name,
                    price: price,
                    year: year,
                    image: imgSrc
                });
                
                e.target.textContent = '★ В избранном';
                e.target.disabled = true;
                
                updateList();
            };
        });
    }
    
    // ФИЛЬТР со стрелочной функцией
    function setupFilter() {
        const filter = document.getElementById('categoryFilter');
        if (!filter) return;
        
        filter.onchange = () => {                
            const value = filter.value;
            const products = document.querySelectorAll('.product');
            
            products.forEach(product => {       
                const category = product.getAttribute('data-category');
                
                if (value === 'all' || category === value) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        };
    }
    
    createFavoritesBlock();
    setupFavButtons();
    setupFilter();
});