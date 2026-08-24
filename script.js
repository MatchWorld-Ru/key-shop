let selectedPrice = 300;
let selectedDurationName = '7 Дней';

// Выбор срока подписки
function selectDuration(button, price, durationName) {
    document.querySelectorAll('.dur-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    selectedPrice = price;
    selectedDurationName = durationName;
    document.getElementById('current-price').innerText = price;
}

// Логика покупки (симуляция генерации ключа)
function buyProduct() {
    // Здесь можно подключить реальную платежку (например, Lava, Lolzteam, CrystalPay)
    const confirmBuy = confirm(`Купить подписку на ${selectedDurationName} за ${selectedPrice} ₽?`);
    
    if (confirmBuy) {
        // Генерируем фейковый ключ для демо (в реальности выдается после оплаты)
        const randomKey = 'LUX-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-' + Math.random().toString(36).substring(2, 8).toUpperCase();
        
        let userKeys = JSON.parse(localStorage.getItem('userKeys')) || [];
        userKeys.push({ key: randomKey, duration: selectedDurationName });
        localStorage.setItem('userKeys', JSON.stringify(userKeys));

        alert('Оплата прошла успешно! Ключ добавлен в ваш личный кабинет.');
        updateCabinetKeys();
    }
}

// Открытие / закрытие личного кабинета
function openCabinet() {
    document.getElementById('cabinetModal').style.display = 'block';
    updateCabinetKeys();
}

function closeCabinet() {
    document.getElementById('cabinetModal').style.display = 'none';
}

// Обновление списка ключей в кабинете
function updateCabinetKeys() {
    const keysContainer = document.getElementById('userKeys');
    let userKeys = JSON.parse(localStorage.getItem('userKeys')) || [];
    
    if (userKeys.length === 0) {
        keysContainer.innerHTML = '<div class="no-keys">У вас пока нет активных ключей.</div>';
        return;
    }
    
    let html = '';
    userKeys.forEach(item => {
        html += `<div class="key-item"><b>${item.duration}:</b> ${item.key}</div>`;
    });
    keysContainer.innerHTML = html;
}

// Закрытие модального окна кликом вне его
window.onclick = function(event) {
    let modal = document.getElementById('cabinetModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
