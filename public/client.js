// public/client.js
const socket = io();

const joinForm = document.getElementById('joinForm');
joinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const opponent = document.getElementById('opponent').value;
    socket.emit('joinGame', { username, opponent });
});

socket.on('gameStart', (gameData) => {
    // Aquí puedes redirigir al jugador a la pantalla de juego con los datos recibidos
});
