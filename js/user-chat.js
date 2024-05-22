document.addEventListener('DOMContentLoaded', async () => {
    const userProfileContainer = document.getElementById('chat-user');
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');

    // розблокувати наступний рядок в разі необхідності оновити список юзерів
    // localStorage.removeItem('users');
    // Завантаження користувачів з localStorage або JSON-файлу
    const users = JSON.parse(localStorage.getItem('users')) || await loadUsers();

    const user = users.find(user => user.id === userId);

    if (!user) {
        userProfileContainer.innerHTML = '<p>User not found</p>';
        return;
    }

    // Відображення картки користувача верх
    userProfileContainer.innerHTML = `
    <div class="chat-top">
        <div class="user-photo__chat">
          <img src="${user.image}" alt="Profile ${user.id}" class="profile-link" style="cursor:pointer;">
        </div>
        <button class="block-btn NS-800">Block</button>
    </div>
    `;

    // додати фото в переписку
    const userPhotoContainer = document.getElementById('user-photo');
    userPhotoContainer.innerHTML = `
    <div class="user-photo__chat">
        <img src="${user.image}" alt="Profile ${user.id}" class="profile-link" style="cursor:pointer;">
    </div>
    `;

    // Додавання обробників подій для кнопок "Block"
    const popup = document.querySelector('.popup');
    const popupOverlay = document.querySelector('.popup-overlay');
    const deleteButton = document.querySelector('.delete-btn');
    const cancelButton = document.querySelector('.cancel-btn');
    const closeButton = document.querySelector('.close-btn');

    document.querySelector('.block-btn').addEventListener('click', () => {
        popup.style.display = 'block';
        popupOverlay.style.display = 'block';
    });

    deleteButton.addEventListener('click', () => {
        const updatedUsers = users.filter(u => u.id !== user.id);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        window.location.href = 'users.html';
    });

    cancelButton.addEventListener('click', () => {
        popup.style.display = 'none';
        popupOverlay.style.display = 'none';
    });

    closeButton.addEventListener('click', () => {
        popup.style.display = 'none';
        popupOverlay.style.display = 'none';
    });

    // Функція для завантаження даних з JSON-файлу
    async function loadUsers() {
        const response = await fetch('usersmain.json');
        const users = await response.json();
        return users;
    }

    const userMsgContainer = document.querySelector('#user-msg');
    const inputField = document.getElementById('gest-msg');
    const sendButton = document.querySelector('.gest-msg-enter button');

    // Виводимо повідомлення користувача з затримкою в 2 секунди
    setTimeout(function() {
        userMsgContainer.innerHTML = '<span class="user-msg">Hi sweety! I’m boring...</span>';
    }, 2000);
// відправка введеного повдомлення
const chatContainer = document.querySelector('.chat-container');
    sendButton.addEventListener('click', function() {
        const message = inputField.value.trim(); // Отримуємо текст з поля вводу

        if (message !== '') { // Перевіряємо, чи не порожнє повідомлення
            const newMsg = document.createElement('div');
            newMsg.className = 'gest-msg'; // Adding class to the new message element
            newMsg.textContent = message;
            chatContainer.appendChild(newMsg); // Додаємо нове повідомлення до контейнера чату
            inputField.value = ''; // Очищаємо поле вводу
        }
    });
});
