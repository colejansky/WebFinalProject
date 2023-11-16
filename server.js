const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('login', { pageTitle: 'Login Page' });
});

app.get('/taskview', (req, res) => {
  res.render('taskview', { pageTitle: 'Task Manager View' });
});

app.get('/index', (req, res) => {
  res.render('index', { pageTitle: 'Task Manager Home' });
});

app.get('/chat', (req, res) => {
  res.render('chat', { pageTitle: 'Chat Room' });
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
