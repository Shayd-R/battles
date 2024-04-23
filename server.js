// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mysql = require('mysql');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configuración de la conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'battleship'
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos MySQL');
});

// Middleware para el manejo de solicitudes POST
app.use(express.urlencoded({ extended: true }));

// Ruta para la página de inicio
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Ruta para guardar el nombre del jugador en la base de datos
app.post('/guardar-nombre', (req, res) => {
    const { nombre } = req.body;
    if (!nombre) {
        res.status(400).send('Error: Nombre del jugador no proporcionado.');
        return;
    }

    // Insertar el nombre del jugador en la base de datos
    const sql = 'INSERT INTO users (user_name) VALUES (?)';
    db.query(sql, [nombre], (err, result) => {
        if (err) {
            console.error('Error al insertar nombre en la base de datos:', err);
            res.status(500).send('Error interno del servidor.');
            return;
        }
        console.log('Nombre del jugador guardado en la base de datos');
        res.redirect('/seleccion-oponente.html'); // Redirigir a la página de juego
    });
});

// server.js

// Ruta para jugar con otro oponente
app.post('/jugar-con-oponente', (req, res) => {
    const { nombreOponente } = req.body;
    if (!nombreOponente) {
        res.status(400).send('Error: Nombre del oponente no proporcionado.');
        return;
    }

    // Redirigir al jugador a la página de juego contra el oponente
    res.redirect(`/jugar-oponente.html?nombre=${nombreOponente}`);
});


// Configurar el servidor para escuchar en el puerto 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
