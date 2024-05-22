document.addEventListener('DOMContentLoaded', async () => {
    const userProfileContainer = document.getElementById('user-profile');
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

    // Відображення картки користувача
    userProfileContainer.innerHTML = `
        <div class="user-photo__profile">
          <img src="${user.image}" alt="Profile ${user.id}" class="profile-link" style="cursor:pointer;">
        </div>
        <div class="user__choice__btns-profile">
        <button class="chat-btn__profile NS-800">
            <svg width="37.000000" height="34.000000"
                viewBox="0 0 37 34" fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink">
                <defs />
                <path id="chat"
                    d="M18.51 0C8.29 0 0 7.58 0 14.14C0 18.71 3.68 22.85 8.59 25.34C7.91 27.45 6.55 30.4 3.85 33.04C3.5 33.39 3.47 33.55 3.57 33.75C3.75 34.15 4.2 33.98 5 33.8C9.25 32.81 14.11 29.45 16.46 27.68C17.14 27.75 17.83 27.8 18.48 27.8C27.62 27.8 37 21.2 37 14.14C37.02 7.72 28.75 0 18.51 0ZM10.87 18.39C8.9 18.39 7.32 16.83 7.32 14.92C7.32 13.01 8.92 11.45 10.87 11.45C12.82 11.45 14.42 13.01 14.42 14.92C14.4 16.83 12.82 18.39 10.87 18.39ZM18.93 18.39C16.98 18.39 15.38 16.83 15.38 14.92C15.38 13.01 16.98 11.45 18.93 11.45C20.88 11.45 22.48 13.01 22.48 14.92C22.45 16.83 20.88 18.39 18.93 18.39ZM26.8 18.39C24.85 18.39 23.25 16.83 23.25 14.92C23.25 13.01 24.85 11.45 26.8 11.45C28.75 11.45 30.35 13.01 30.35 14.92C30.35 16.83 28.75 18.39 26.8 18.39Z"
                    fill-rule="nonzero" />
            </svg>
          </button>
          <button class="block-btn NS-800">
            <svg width="11.000000" height="11.000000"
                viewBox="0 0 11 11" fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink">
                <defs />
                <path id="block"
                    d="M8 5.5L10.86 2.64C11.03 2.46 11.03 2.18 10.86 2.01L8.98 0.13C8.81 -0.05 8.53 -0.05 8.35 0.13L5.5 2.99L2.62 0.13C2.45 -0.05 2.17 -0.05 1.99 0.13L0.12 2.01C-0.05 2.18 -0.05 2.46 0.12 2.64L2.99 5.5L0.12 8.36C-0.05 8.53 -0.05 8.81 0.12 8.99L2 10.87C2.17 11.04 2.45 11.04 2.63 10.87L5.5 8.01L8.36 10.87C8.53 11.04 8.81 11.04 8.99 10.87L10.87 8.99C11.04 8.81 11.04 8.54 10.87 8.36L8 5.5Z"
                    fill-rule="nonzero" />
            </svg>
            Block
          </button>
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

    // Додавання обробників подій для кнопок "Chat" на сторінці користувача
    document.querySelector('.chat-btn__profile').addEventListener('click', () => {
        window.location.href = `/chat.html?id=${userId}`;
    });
});

// Функція для завантаження даних з JSON-файлу
async function loadUsers() {
    const response = await fetch('usersmain.json');
    const users = await response.json();
    return users;
}

// Додавання обробників подій для кнопок "Chat" на інших сторінках
document.querySelectorAll('.chat-btn').forEach(button => {
    button.addEventListener('click', function() {
        const userId = this.closest('.user').dataset.id;
        window.location.href = `/chat.html?id=${userId}`;
    });
});
